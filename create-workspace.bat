@echo off

if "%1"=="-h" (
  type create-workspace-help.txt
  exit /b 0
)

for %%* in (.) do set "workspaceName=%%~n*"

echo Creating new workspace file...
echo { > "%workspaceName%.code-workspace"
echo     "folders": [ >> "%workspaceName%.code-workspace"

set /a count=0

echo Adding folders to the workspace...

for /d %%f in (*) do (
  set /a count+=1
  echo         { >> "%workspaceName%.code-workspace"
  echo             "name": "%%f", >> "%workspaceName%.code-workspace"
  echo             "path": "%%f" >> "%workspaceName%.code-workspace"
  echo         }, >> "%workspaceName%.code-workspace"
)

if %count% equ 0 (
  echo No folders found in the current directory.
  echo Please move this script to the root directory of your workspace.
  pause
  exit
)

echo     ] >> "%workspaceName%.code-workspace"
echo } >> "%workspaceName%.code-workspace"

echo Opening workspace in VS Code...
code "%cd%\%workspaceName%.code-workspace"
