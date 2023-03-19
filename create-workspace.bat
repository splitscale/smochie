@echo off
for %%* in (.) do set "workspaceName=%%~n*"

echo Creating new workspace file...
echo {
echo     "folders": [

echo         {
echo             "path": "."
echo         },

) > "%workspaceName%.code-workspace"

set /a count=0

echo Adding folders to the workspace...

for /d %%f in (*) do (
  set /a count+=1
  echo         {
  echo             "name": "%%f",
  echo             "path": "%%f"
  echo         },
)

if %count% equ 0 (
  echo No folders found in the current directory.
  echo Please move this script to the root directory of your workspace.
  pause
  exit
)

echo     ]
echo } >> "%workspaceName%.code-workspace"

echo Opening workspace in VS Code...
code "%cd%\%workspaceName%.code-workspace"
