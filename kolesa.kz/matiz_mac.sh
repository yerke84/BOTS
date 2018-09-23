#!/bin/bash
cd ~/Desktop/github/BOTS/kolesa.kz
npm run matiz

read -p "Для выхода наберите y и нажмите ентер:" -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
   [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell
fi
