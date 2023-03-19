# Configs
Enforce standard formatting using this configurations repo
---

## Usage

# Using the `ss` command

1. Run this command inside the `configs` repo
```
ss init --path
```
copy the path and add to `env` (you can search this in the start menu)


2. Run now can run this in one of splitscale repos
> e.g. config, .github, etc.
```
ss init -c
```

# Manual configuration

### Put the template file here:

```
~/commit-template.txt
```

### Configure git to use the template file by running:
```
git config --global commit.template ~/commit-template.txt
```

### Add the template file to the ~/.gitconfig file:
```
  [commit]
    template = ~/commit-template.txt
```
### Add the git urls inside the repositories/<projectName>-repo.txt:
```
  [clone]
    repositories = ~repositories/<projectName>-repo.txt
```

If you prefer other file locations or ways of working,
you can freely adjust the usage as you like.

# Generated Instructions

# Shell Script Manager

This is a bash script that manages the creation of workspaces and the cloning of repositories. It also includes a function to add the current path to the environment variables and a commit template for Git.

## How to Use

To use this script, run the main function with one of the following arguments:

- `init`: Initializes the script with additional features.
  - `--path`: Adds the current path to the environment variables.
  - `-c`: Loads a commit template to the current repository.
- `clone`: Clones repositories from a list of URLs in a text file.
- `create`: Creates a new workspace with a given name and sets it up for Git.
- `-h`: Shows the help menu.

Invalid arguments will show the help menu.

## Files

- `ascii/banner.txt`: ASCII art for the banner.
- `version.txt`: Version information.
- `commit-template.txt`: A template for Git commits.
- `clone-repos.sh`: A script for cloning repositories from a text file.
- `create-workspace.sh`: A script for creating a new workspace.