@echo off

if "%~1"=="" (
  call :showHelp
  exit /b
)

if /I "%~1"=="-h" (
  call :showHelp
  exit /b
)

set "projectName=%~1"
set "dependenciesFile=repositories\%projectName%-dependencies.txt"

if not exist "%dependenciesFile%" (
  echo Dependencies file not found: %dependenciesFile%
  exit /b
)

if not exist "%projectName%" (
  mkdir "%projectName%"
)

for /F "delims=" %%i in (%dependenciesFile%) do (
  git clone "%%i" "%projectName%\%%~nxi"
)

echo Cloning completed.
goto :eof

:showHelp
type clone-repos-help.txt
