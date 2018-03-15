# Mac / Linux
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# blasted path is forever fail
. ~/.nvm/nvm.sh
nvm i --lts
nvm use --lts

# blow away and start fresh
rm -rf node_modules
npm i
npm i -g surge ember-cli

# blow away and start fresh
rm -rf dist docs;
ember build --environment=production;
mv dist docs;
git add docs -f;
git commit -am "prod build";
git push;

# serve things
fuser -k 8080/tcp
http-server ./docs & # run in background for fun
surge --domain ember.cds-payments.surge.sh ./docs
surge --domain demo.cds-payments.surge.sh ./docs
ember s
