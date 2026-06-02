@echo off
echo === Node version ===
node --version
echo === npm version ===  
npm --version
echo === Installing dependencies ===
call npm ci
if %ERRORLEVEL% neq 0 (
    echo npm ci failed
    exit /b 1
)
echo === Building ===
call npm run build
if %ERRORLEVEL% neq 0 (
    echo npm build failed
    exit /b 1
)
echo === Running tests ===
call npm test -- --runInBand --forceExit
if %ERRORLEVEL% neq 0 (
    echo Tests failed
    exit /b 1
)
echo === All steps passed ===
