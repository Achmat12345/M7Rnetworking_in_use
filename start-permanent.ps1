# M7RNetworking Permanent Startup Script
# Run as Administrator for best results

Write-Host "Starting M7RNetworking Platform on Permanent Ports..." -ForegroundColor Green
Write-Host "Backend: http://localhost:5002" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3002" -ForegroundColor Yellow
Write-Host ""

# Set location to project directory
Set-Location "c:\Users\achma\Downloads\M7rNetworking"

# Check if PM2 is installed globally
$pm2Check = Get-Command pm2 -ErrorAction SilentlyContinue
if (-not $pm2Check) {
    Write-Host "Installing PM2 globally..." -ForegroundColor Blue
    npm install -g pm2
}

# Check if concurrently is installed
$concurrentlyCheck = Get-Command concurrently -ErrorAction SilentlyContinue
if (-not $concurrentlyCheck) {
    Write-Host "Installing concurrently..." -ForegroundColor Blue
    npm install -g concurrently
}

# Create logs directory if it doesn't exist
if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" -Force
}

# Kill any existing processes on these ports
Write-Host "Stopping any existing processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Start the applications with PM2
Write-Host "Starting applications with PM2..." -ForegroundColor Green
pm2 delete all -s
pm2 start ecosystem.config.js

# Show status
Write-Host ""
Write-Host "Application Status:" -ForegroundColor Green
pm2 status

Write-Host ""
Write-Host "✅ M7RNetworking is now running permanently!" -ForegroundColor Green
Write-Host "   Backend API: http://localhost:5002/api" -ForegroundColor Cyan
Write-Host "   Frontend:    http://localhost:3002" -ForegroundColor Cyan
Write-Host ""
Write-Host "Useful Commands:" -ForegroundColor Yellow
Write-Host "   npm run pm2:status   - Check status" -ForegroundColor White
Write-Host "   npm run pm2:logs     - View logs" -ForegroundColor White
Write-Host "   npm run pm2:restart  - Restart apps" -ForegroundColor White
Write-Host "   npm run pm2:stop     - Stop apps" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to exit this script (apps will continue running)" -ForegroundColor Gray

# Keep script running to show logs
try {
    pm2 logs
} catch {
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
