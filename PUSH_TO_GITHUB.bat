@echo off
title TIMEORA - Push to GitHub Repository
color 0b

set "PATH=C:\Program Files\GitHub CLI;%LOCALAPPDATA%\Programs\MinGit\cmd;%PATH%"

echo ======================================================================
echo           TIMEORA LUXURY STORE - GITHUB REPOSITORY SYNC
echo ======================================================================
echo Repository: https://github.com/AbdurRaheem467/Abdurraheem.git
echo.

cd /d "%~dp0"

echo [1/4] Checking Git Status...
git status
echo.

echo [2/4] Ensuring All Files Are Staged and Committed...
git add .
git commit -m "TIMEORA Haute Horlogerie Luxury Watches Complete Website" 2>nul
echo.

echo [3/4] Checking GitHub Authentication...
gh auth status 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ======================================================================
    echo Please authenticate with your GitHub account:
    echo Browser will open automatically. Click 'Authorize github' to login.
    echo ======================================================================
    echo.
    gh auth login --web --git-protocol https
)

echo.
echo [4/4] Configuring Git Credentials and Pushing to Repository...
gh auth setup-git
git remote set-url origin https://github.com/AbdurRaheem467/Abdurraheem.git
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ======================================================================
    echo SUCCESS! Website files have been pushed to GitHub successfully!
    echo.
    echo View your repository here:
    echo https://github.com/AbdurRaheem467/Abdurraheem
    echo ======================================================================
) else (
    echo.
    echo ======================================================================
    echo Push encountered an issue. If prompt asks for username/password,
    echo enter your GitHub Username and Personal Access Token (PAT).
    echo ======================================================================
)

echo.
pause
