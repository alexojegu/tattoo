#!/bin/sh

files=$(git diff --cached --name-only --diff-filter=dx)

echo "$files" | grep -E "\.(jsx?|tsx?)$" | xargs npx eslint

if [ $? -ne 0 ]; then
  exit $?
fi

echo "$files" | xargs npx prettier --ignore-unknown --write
echo "$files" | xargs git add
