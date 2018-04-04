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
cp ./vendor/cds-process.min.js ./docs
git add docs -f;
git commit -am "prod build";
git push;

# serve things
fuser -k 8080/tcp
http-server ./docs & # run in background for fun
#surge --domain ember.cds-payments.surge.sh ./docs
surge --domain demo.cds-payments.surge.sh ./docs
aws s3 sync ./docs s3://payment-widget-ui-cloudfront --acl public-read --profile cdsg-highlander
echo 'http://d2znaubcly5dbd.cloudfront.net/index.html'
ember s
