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

# To add a path in macOS:

1. Open Terminal.
2. Type `nano ~/.bash_profile` and press Enter.
3. Use the arrow keys to move to the bottom of the file and add a new line.
4. Type `export PATH=/path/to/directory:$PATH`, replacing "/path/to/directory" with the actual path of the directory you want to add to the PATH.
5. Press Ctrl+X to exit Nano, then type Y to save the changes and Enter to confirm the filename.
6. Close the Terminal window and reopen it to activate the new PATH.
