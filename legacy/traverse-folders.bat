@echo off
setlocal EnableDelayedExpansion

:: Define function
:traverseFolders
setlocal
set root=%1
set command=%2
set excludeFolders=%3

echo Root folder: %root%
echo Command: %command%
echo Excluded folders: %excludeFolders%

for /d %%d in ("%root%\*") do (
    if "%excludeFolders%"=="" (
        echo Visiting directory: %%d
        cd "%%d" && echo Executing command on folder: %%d && %command%
    ) else (
        set found=0
        for %%o in (%excludeFolders%) do (
            if /i "%%~nxd"=="%%o" (
                echo Skipping excluded folder: %%d\%%o
                set found=1
                goto skip
            )
        )
        if not !found!==1 (
            echo Visiting directory: %%d
            cd "%%d" && echo Executing command on folder: %%d && %command%
        )
    )
    :skip
    popd
)

endlocal
