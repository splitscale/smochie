@echo off
SET mypath=%~dp0
SET current_path=%mypath:~0,-1%

type %current_path%\ascii\banner.txt
echo.
type %current_path%\version.txt
echo.

:main
IF "%~1"=="init" GOTO init
IF "%~1"=="clone" GOTO clone_repos
IF "%~1"=="create" GOTO create_workspace
IF "%~1"=="-h" GOTO show_ss_help
IF "%~1"=="slaveAll" GOTO slaveAll
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
CALL echo [%current_path%/config] commit template loaded to this repo
EXIT /B 0

:clone_repos

CALL %current_path%\clone-repos.bat %*
EXIT /B 0

:create_workspace

CALL %current_path%\create-workspace.bat %*
EXIT /B 0

:show_ss_help
type %current_path%\ss-help.txt
EXIT /B 0

:show_clone_repos_help
type %current_path%\show_clone_repos_help.txt
EXIT /B 0

:slaveAll
CALL %current_path%\slave_all.bat %current_path% %*
EXIT /B 0

:invalid_params
type %current_path%\ss-help.txt
EXIT /B 1
