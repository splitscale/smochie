#!/bin/bash

show_help() {
  cat << EOF
Usage: $0 <projectName> [repositoryFile]

  projectName: name of the project directory to create
  repositoryFile: path to the file containing repository URLs
                  default: repositories/<projectName>-repo.txt

  -h: show this help message

EOF
}

if [[ -z "$1" ]]; then
    show_help
    exit 1
fi

if [[ "$1" == "-h" ]]; then
    show_help
    exit 0
fi

projectName="$1"

if [[ -z "$2" ]]; then
    repositoryFile="$(dirname "$0")/repositories/${projectName}-repo.txt"
else
    repositoryFile="$2"
fi

if [[ ! -f "$repositoryFile" ]]; then
    echo "Repo file not found: ${repositoryFile}"
    exit 1
fi

if [[ ! -d "$projectName" ]]; then
    mkdir "$projectName"
fi

while read -r line; do
    git clone "$line" "${projectName}/$(basename "$line")"
done < "$repositoryFile"

echo "Cloning completed."
exit 0
