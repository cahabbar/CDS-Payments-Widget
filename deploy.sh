. ~/.nvm/nvm.sh; nvm use 8
npm i -g surge ember-cli
npm i
ember build
mv dist/index.html dist/200.html
#surge --domain demo.cds-payments.surge.sh ./dist
surge dist demo.cds-payments.surge.sh

