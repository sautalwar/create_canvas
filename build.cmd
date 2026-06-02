@echo off
echo === Node version ===
node --version
echo === NPM version ===  
call npm --version
echo === Installing dependencies ===
call npm ci
if %ERRORLEVEL% NEQ 0 (
    echo npm ci failed with exit code %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)
echo === Building ===
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo build failed with exit code %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)
echo === Running tests ===
call npm test -- --runInBand --forceExit
if %ERRORLEVEL% NEQ 0 (
    echo tests failed with exit code %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)
echo === All steps passed ===
