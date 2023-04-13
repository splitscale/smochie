@echo off

REM Set default values for options
set exclude_folders=
set root_folder=%cd%

REM Parse options
:parse_options
if "%~1"=="" goto execute_command
if "%~1"=="--omit" (
  set exclude_folders=%~2
  shift
  shift
  goto parse_options
)
if "%~1"=="--dir" (
  set root_folder=%~2
  shift
  shift
  goto parse_options
)
if "%~1"=="-h" (
  goto show_help
)

REM If none of the options match, assume it's the command to execute
:execute_command
if "%~1"=="" (
  echo Error: No command specified.
  goto show_help
)
set command=%*

REM Traverse the folders and execute the command
@REM echo  %root_folder% %command% %exclude_folders%
call traverse-folders.bat %root_folder% %command% %exclude_folders%

REM If no command is specified, show usage guide
:show_help
type %usage%
EXIT /B 1