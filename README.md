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

If you prefer other file locations or ways of working,
you can freely adjust the usage as you like.
