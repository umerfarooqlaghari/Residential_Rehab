@echo off
title Residential Rehab Website Server
color 0A
echo.
echo ========================================
echo    RESIDENTIAL REHAB WEBSITE SERVER
echo ========================================
echo.

echo [1/3] Cleaning up any existing processes...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/3] Clearing cache...
rmdir /s /q .next 2>nul
timeout /t 1 /nobreak >nul

echo [3/3] Starting development server...
echo.
echo ✅ Website will be available at: http://localhost:3000
echo ✅ Admin Login: http://localhost:3000/admin/login
echo.
echo 📧 Admin Email: ak1096561@gmail.com
echo 🔑 Admin Password: Anaskhan123
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npm run dev
