git commit -am "updates"
git push
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
. ~/.nvm/nvm.sh
nvm i --lts
nvm use --lts
rm -rf node_modules
npm i
npm i -g surge ember-cli
ember build
surge --domain ember.cds-payments.surge.sh ./dist
surge --domain demo.cds-payments.surge.sh ./dist
