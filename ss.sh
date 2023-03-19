#!/bin/bash

mypath="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
current_path="$mypath"

cat "$current_path/ascii/banner.txt"
echo ""
cat "$current_path/version.txt"
echo ""

main() {
    if [[ $1 == "init" ]]; then init "${@:2}"; fi
    if [[ $1 == "clone" ]]; then clone_repos "${@:2}"; fi
    if [[ $1 == "create" ]]; then create_workspace "${@:2}"; fi
    if [[ $1 == "-h" ]]; then show_ss_help; fi
    shift
    invalid_params
    main
    exit 0
}

init() {
    if [[ $2 == "-c" ]]; then commit_template; fi
    if [[ $2 == "--path" ]]; then add_path_to_env; fi
    exit 0
}

add_path_to_env() {
    echo "ADD THIS PATH TO ENVIRONMENT VARIABLES: $current_path"
    echo ""
    exit 0
}

commit_template() {
    git config commit.template "$current_path/commit-template.txt"
    echo "[$current_path/config] commit template loaded to this repo"
    echo ""
    exit 0
}

clone_repos() {
    bash "$current_path/clone-repos.sh" "$@"
    echo ""
    exit 0
}

create_workspace() {
    bash "$current_path/create-workspace.sh" "$@"
    echo ""
    exit 0
}

show_ss_help() {
    cat "$current_path/ss-help.txt"
    echo ""
    exit 0
}

invalid_params() {
    cat "$current_path/ss-help.txt"
    echo ""
    exit 1
}

main "$@"
