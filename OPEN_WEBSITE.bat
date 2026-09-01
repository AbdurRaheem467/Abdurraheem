@echo off
title TIMEORA Haute Horlogerie Store
echo ======================================================
echo Starting TIMEORA Luxury Watch Store...
echo ======================================================
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
