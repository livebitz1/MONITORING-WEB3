# Start Docker Desktop service
Start-Service -Name "com.docker.service"
Write-Host "Docker Desktop service started" -ForegroundColor Green

# Give Docker some time to initialize
Write-Host "Waiting for Docker to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verify Docker is running correctly
Write-Host "Verifying Docker is running correctly..." -ForegroundColor Yellow
docker version
