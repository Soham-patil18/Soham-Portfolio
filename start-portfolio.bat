@echo off
title Soham Patil Portfolio Server
echo ========================================================
echo Starting Soham Patil's Portfolio Website...
echo ========================================================
cd /d "%~dp0"
start http://localhost:5000
python -m http.server 5000
pause
