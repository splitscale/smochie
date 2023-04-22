# Smochie

Smochie, a multi-dependency project manager able to manage multiple GitHub repositories that make up the application. With Smochie, you can easily clone existing projects and their dependencies, execute commands in multiple folders under a root directory, and workspaces, and manage your projects with ease.

This tool is designed for developers who want to streamline their workflow. Smochie CLI saves time and effort compared to manually cloning each repository. This allows you to focus on writing code and delivering features for the application.

Whether you're a solo developer or part of a team, Smochie CLI makes it easy to manage your projects and stay organized. Get started with Smochie today and take your project management to the next level!

# Compatibility

| OS | Compatible |
|:-------:|:----------:|
|  <img src="https://i1.wp.com/www.nesabamedia.com/wp-content/uploads/2021/06/Windows-11-Logo.png?resize=680%2C680&ssl=1" width="24"> windows  |  :heavy_check_mark:   |
|  <img src="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg" width="24"> linux  |  :heavy_check_mark:   |
|  <img src="https://pnggrid.com/wp-content/uploads/2021/04/white-apple-1252x1536.png" width="24"> mac  |  :x:   |

# Installation

To use Smochie, you'll first need to install the Smochie CLI tool. You can do this using npm, the Node.js package manager.

## Prerequisites

Before you can install Smochie, you'll need to have Node.js and npm installed on your system. You can download and install the latest version of Node.js from the official Node.js website: https://nodejs.org/

## Installation Steps

Once you have Node.js and npm installed, you can install Smochie using the following command:

```
npm install -g smochie
```

This will install the Smochie CLI tool globally on your system. You can then run Smochie commands from any directory in your terminal.

## Verification

To verify that Smochie has been installed correctly, you can run the following command:

```
smochie --version
```

This should display the current version of Smochie installed on your system. If you see an error message or the version number is not displayed, try running the installation command again.

Congratulations! You've successfully installed Smochie and are ready to start using it to manage your Smochie projects.

# Usage

Smochie is a command-line tool that provides several workflows for managing Smochie projects. To use Smochie, you'll need to open a terminal or command prompt and navigate to the directory where you want to create or manage a Smochie project.

## Command Syntax

The basic syntax for running a Smochie command is as follows:

```
smochie <command> [options]
```
Here, `<command>` is the name of the Smochie command you want to run, and `[options]` are any additional options or arguments that the command requires. For example, to clone a Smochie project, you would run the following command:

```
smochie clone
```

This would clone the default Smochie project repository into the current directory. You can also specify additional options to customize the clone operation, such as the output directory:

```
smochie clone --path /path/to/clone/directory
```

Available Commands

Smochie provides several commands for managing Smochie projects. The currently available commands are:

- `clone`: Clones the default Smochie project repository into the current directory, or a specified output directory.
- `create project`: Creates a new Smochie project in the current directory or a specified output directory.
- `create workspace`: Creates a new Smochie workspace in the current directory or a specified output directory.

To get more information about a specific command and its options, you can use the `--help` or `-h` flag. For example:

```
smochie clone --help
```

```
smochie clone -h
```

This will display the help text for smochie, including a list of available options and their descriptions.

# Project Structure
Project directory should look like this:
```
/project
  /ui
  /api
  /core
  /services
  /implementations
```

This project directory structure organizes the codebase into different directories based on their functionalities.

This directory structure allows for a modular and scalable codebase, where different functionalities can be developed and maintained separately. It also helps with code reusability and code maintainability, as each directory can have its own set of tests, documentation, and version control.

# Usage

```
Usage: smochie [options] <command>

Options:
  -h, --help          display this usage guide

Commands:
  clone               Clone a project from Smochie
  create project      Create a new project on Smochie
  create workspace    Create a new workspace on Smochie

Options for 'clone' command:
  -p, --path <path>   set the output directory path (default: current working directory)

Examples:
  smochie clone
  smochie clone -p ~/projects/my-project
  smochie create project
```
