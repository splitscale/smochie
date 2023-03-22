@echo off

setlocal

REM Parse the arguments
set root=%1
set command=%3 %*
set omit_folders=
set dir=

shift
shift

:parse_args
if "%~1"=="" goto end_parse_args

if /i "%~1"=="--omit" (
    shift
    set omit_folders=%1
    shift
    goto parse_args
)

if /i "%~1"=="--dir" (
    shift
    set dir=%1
    shift
    goto parse_args
)

echo Command: %command%
echo Root folder: %root%

goto end_parse_args

:end_parse_args

REM If --dir option is specified, set the root folder to the specified directory
if defined dir (
    set "root=%dir%"
)

REM Check if the root folder exists
if not exist "%root%" (
    echo Error: root folder "%root%" does not exist.
    exit /b 1
)

REM Traverse the folders and execute the command
for /d %%d in ("%root%\*") do (
    if "%omit_folders%"=="" (
        cd "%%d" && %command%
    ) else (
        set found=0
        for %%o in (%omit_folders%) do (
            if /i "%%~nxd"=="%%o" (
                set found=1
                goto skip
            )
        )
        if not !found!==1 (
            cd "%%d" && %command%
        )
    )
    :skip
    popd
)


exit /b 0
