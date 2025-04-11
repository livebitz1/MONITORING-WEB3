Write-Host "Docker Desktop Troubleshooting Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Step 1: Check Docker Desktop service status
$dockerService = Get-Service -Name "com.docker.service" -ErrorAction SilentlyContinue
Write-Host "`nChecking Docker Desktop service status..." -ForegroundColor Yellow
if ($null -eq $dockerService) {
    Write-Host "Docker Desktop service not found! Ensure Docker Desktop is installed correctly." -ForegroundColor Red
    exit 1
} else {
    Write-Host "Docker Desktop service status: $($dockerService.Status)" -ForegroundColor Yellow
}

# Step 2: Start Docker Desktop service if it's stopped
if ($dockerService.Status -eq "Stopped") {
    Write-Host "`nAttempting to start Docker Desktop service..." -ForegroundColor Yellow
    try {
        Start-Service -Name "com.docker.service"
        Write-Host "Docker Desktop service started successfully." -ForegroundColor Green
    } catch {
        Write-Host "Failed to start Docker Desktop service: $_" -ForegroundColor Red
        Write-Host "Try starting Docker Desktop application manually." -ForegroundColor Yellow
    }
} 

# Step 3: Check WSL status
Write-Host "`nChecking WSL status..." -ForegroundColor Yellow
try {
    $wslOutput = wsl -l -v 2>&1
    Write-Host "WSL distributions:" -ForegroundColor Yellow
    Write-Host $wslOutput
} catch {
    Write-Host "Error checking WSL status: $_" -ForegroundColor Red
}

# Step 4: Restart WSL
Write-Host "`nRestarting WSL..." -ForegroundColor Yellow
try {
    wsl --shutdown
    Write-Host "WSL shutdown successful." -ForegroundColor Green
    Start-Sleep -Seconds 5
} catch {
    Write-Host "Error shutting down WSL: $_" -ForegroundColor Red
}

# Step 5: Verify Docker is running correctly
Write-Host "`nVerifying Docker is running correctly..." -ForegroundColor Yellow
Start-Sleep -Seconds 10  # Give Docker some time to initialize

try {
    $dockerVersion = docker version 2>&1
    if ($dockerVersion -match "Internal Server Error") {
        Write-Host "Docker is still not responding properly." -ForegroundColor Red
        Write-Host "`nTroubleshooting recommendations:" -ForegroundColor Cyan
        Write-Host "1. Open Docker Desktop application manually" -ForegroundColor White
        Write-Host "2. Check Windows Event Viewer for Docker related errors" -ForegroundColor White
        Write-Host "3. Restart your computer" -ForegroundColor White
        Write-Host "4. Reinstall Docker Desktop if issues persist" -ForegroundColor White
    } else {
        Write-Host "Docker appears to be running correctly!" -ForegroundColor Green
        Write-Host "`nTrying to run 'docker ps':" -ForegroundColor Yellow
        docker ps
    }
} catch {
    Write-Host "Error verifying Docker: $_" -ForegroundColor Red
}
