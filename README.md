# Configs
Enforce standard formatting using this configurations repo
---

## Usage

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
