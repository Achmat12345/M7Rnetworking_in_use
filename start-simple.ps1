# M7RNetworking Simple Permanent Startup
# This starts both services using npm scripts

Write-Host "🚀 Starting M7RNetworking Platform..." -ForegroundColor Green
Write-Host "Backend will run on: http://localhost:5002" -ForegroundColor Yellow
Write-Host "Frontend will run on: http://localhost:3002" -ForegroundColor Yellow
Write-Host ""

# Set location to project directory
Set-Location "c:\Users\achma\Downloads\M7rNetworking"

# Kill any existing processes on these ports
Write-Host "Cleaning up any existing processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Start backend in background
Write-Host "Starting Backend on port 5002..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\achma\Downloads\M7rNetworking'; npm run backend:5002"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend in background  
Write-Host "Starting Frontend on port 3002..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\achma\Downloads\M7rNetworking'; npm run frontend:3002"

# Wait for services to start
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "✅ M7RNetworking is starting up!" -ForegroundColor Green
Write-Host "   Backend API: http://localhost:5002/api" -ForegroundColor White
Write-Host "   Frontend:    http://localhost:3002" -ForegroundColor White
Write-Host ""
Write-Host "📝 Both services are now running in separate PowerShell windows" -ForegroundColor Yellow
Write-Host "   Close this script - the services will continue running" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔧 To stop services later:" -ForegroundColor Gray
Write-Host "   Close the PowerShell windows or run: Get-Process node | Stop-Process" -ForegroundColor Gray

Write-Host ""
Write-Host "Press any key to exit this script..." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
