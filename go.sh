# Mac / Linux
#echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# blasted path is forever fail
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
. ~/.nvm/nvm.sh
nvm i --lts
nvm use --lts

# blow away and start fresh
rm -rf node_modules
npm i
#npm i -g surge ember-cli
npm i -g ember-cli

# blow away and start fresh
rm -rf dist docs;
#ember build --environment=production;
ember build
mv dist docs;
#cp ./vendor/cds-process.min.js ./docs
#git add docs -f;
#git commit -am "prod build";
#git push;

# serve things
#fuser -k 8080/tcp
#http-server ./docs & # run in background for fun
#surge --domain ember.cds-payments.surge.sh ./docs
#surge --domain demo.cds-payments.surge.sh ./docs
#aws s3 sync ./docs s3://payment-widget-ui-cloudfront --acl public-read --profile cdsg-highlander
#AWS_PROFILE=cdsg-nonprod AWS_DEFAULT_REGION=us-east-1 APP_ENV=qa ./hosting/uploads3.sh
#echo 'http://payments.qa-cloud.buysub.com/index.html'
#ember s
