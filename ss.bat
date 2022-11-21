@echo off
SET mypath=%~dp0
SET current_path=%mypath:~0,-1%

type %current_path%\ascii\runner_banner.txt
echo.
type %current_path%\version.txt
echo.

:main
IF "%~1"=="init" GOTO init
SHIFT
GOTO invalid_params
GOTO main
EXIT /B 0

:init
IF [%~2]==[] GOTO invalid_params
IF "%~2"=="-c" GOTO commit_template
IF "%~2"=="--path" GOTO add_path_to_env
EXIT /B 0

:add_path_to_env
echo ADD THIS PATH TO ENVIRONMENT VARIABLES: %current_path%
EXIT /B 0

:commit_template
CALL git config commit.template %current_path%\commit-template.txt
EXIT /B 0

:invalid_params
echo [WARN] Invalid Parameter!
echo.
echo Available commands
echo.
echo    [ init <option>]
echo           -c           initialize commit template
echo           --path        add path to environment
EXIT /B 0