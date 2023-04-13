#!/bin/bash

if [ "$1" == "-h" ]; then
  cat create-workspace-help.txt
  exit 0
fi

workspaceName=$(basename "$PWD")

echo "Creating new workspace file..."
echo "{" > "$workspaceName.code-workspace"
echo "    \"folders\": [" >> "$workspaceName.code-workspace"

count=0

echo "Adding folders to the workspace..."

for dir in */; do
  count=$((count+1))
  echo "        {" >> "$workspaceName.code-workspace"
  echo "            \"name\": \"$dir\"," >> "$workspaceName.code-workspace"
  echo "            \"path\": \"$PWD/$dir\"" >> "$workspaceName.code-workspace"
  echo "        }," >> "$workspaceName.code-workspace"
done

if [ $count -eq 0 ]; then
  echo "No folders found in the current directory."
  echo "Please move this script to the root directory of your workspace."
  read -p "Press any key to continue..."
  exit 1
fi

echo "    ]" >> "$workspaceName.code-workspace"
echo "}" >> "$workspaceName.code-workspace"

echo "Opening workspace in VS Code..."
code "$PWD/$workspaceName.code-workspace"
