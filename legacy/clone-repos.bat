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

if "%~2"=="" (
  set "repositoryFile=repositories\%projectName%-repo.txt"
) else (
  set "repositoryFile=%~2"
)

if not exist "%repositoryFile%" (
  echo Repo file not found: %repositoryFile%-repo.txt
  exit /b
)

if not exist "%projectName%" (
  mkdir "%projectName%"
)

for /F "delims=" %%i in (%repositoryFile%) do (
  git clone "%%i" "%projectName%\%%~nxi"
)

echo Cloning completed.
goto :eof

:showHelp
type clone-repos-help.txt
