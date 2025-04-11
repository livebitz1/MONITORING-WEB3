# Docker Desktop Troubleshooting Guide

This guide helps resolve common Docker Desktop issues on Windows.

## Quick Fix

Run the included PowerShell script as administrator:

```powershell
.\docker-troubleshoot.ps1
```

## Manual Troubleshooting Steps

If the script doesn't resolve your issues, try these manual steps:

1. **Restart Docker Desktop Service:**
   ```powershell
   Stop-Service -Name "com.docker.service"
   Start-Service -Name "com.docker.service"
   ```

2. **Restart WSL:**
   ```powershell
   wsl --shutdown
   ```

3. **Check WSL Status:**
   ```powershell
   wsl -l -v
   ```

4. **Reset Docker Desktop:**
   - Open Docker Desktop
   - Go to Settings > Troubleshoot
   - Click "Clean / Purge data"
   - Restart Docker Desktop

5. **Check Windows Features:**
   - Ensure "Windows Subsystem for Linux" is enabled
   - Ensure "Virtual Machine Platform" is enabled

6. **Update WSL:**
   ```powershell
   wsl --update
   ```

7. **Reinstall Docker Desktop:**
   - Uninstall Docker Desktop
   - Restart your computer
   - Install the latest version of Docker Desktop

## Common Error Messages

- "Internal Server Error for API route": Usually indicates Docker service isn't running properly
- "request returned Internal Server Error": Docker daemon isn't responding

## Additional Resources

- [Docker Desktop for Windows Troubleshooting](https://docs.docker.com/desktop/troubleshoot/overview/)
- [WSL Troubleshooting](https://learn.microsoft.com/en-us/windows/wsl/troubleshooting)
