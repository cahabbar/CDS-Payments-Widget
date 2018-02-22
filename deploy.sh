. ~/.nvm/nvm.sh; nvm use 8
mv dist/index.html dist/200.html
npm i -g surge
#surge --domain demo.cds-payments.surge.sh ./dist 
surge dist demo.cds-payments.surge.sh 

