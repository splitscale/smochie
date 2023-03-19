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
CALL echo [splitscale/config] commit template loaded to this repo
EXIT /B 0

:clone_repos
IF [%~2]==[] GOTO show_clone_repos_help
SET projectName=%~2
CALL %current_path%\clone-repos.bat %projectName%
EXIT /B 0

:create_workspace
SET args=[%~2]
echo Creating workspace for current directory...
CALL %current_path%\create-workspace.bat %args%
EXIT /B 0

:missing_repos_dir
echo Error: Missing repositories folder for project %projectName%.
echo Please make sure the folder 'repositories\%projectName%' exists in the current directory.
pause
EXIT /B 1

:missing_repos_file
echo Error: Missing dependencies file for project %projectName%.
echo Please make sure the file 'repositories\%projectName%-dependencies.txt' exists in the current directory.
pause
EXIT /B 1

:show_ss_help
type %current_path%\ss-help.txt
EXIT /B 0

:show_clone_repos_help
type %current_path%\show_clone_repos_help.txt
EXIT /B 0

:invalid_params
type %current_path%\ss-help.txt
pause
EXIT /B 1
