@echo off
set PATH=%PATH%;C:\Program Files\nodejs;%LOCALAPPDATA%\Programs\Python\Python312;%LOCALAPPDATA%\Programs\Python\Python311

echo Starting portfolio server on http://localhost:3000 ...

node server.js 2>nul
if %ERRORLEVEL% EQU 0 goto done

py -m http.server 3000 2>nul
if %ERRORLEVEL% EQU 0 goto done

python -m http.server 3000 2>nul
if %ERRORLEVEL% EQU 0 goto done

echo Opening HTML directly in browser...
start "" "%~dp0index.html"

:done
pause
