echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
. ~/.nvm/nvm.sh
nvm i 8
nvm use 8
npm i
ember s
