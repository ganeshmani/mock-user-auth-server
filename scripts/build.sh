#!/bin/bash
rm -rf ./dist
./node_modules/.bin/babel ./src/components --out-dir dist/components
./node_modules/.bin/babel ./src/config --out-dir dist/config
./node_modules/.bin/babel ./src/app.js --out-dir dist
./node_modules/.bin/babel ./scripts/create.js --out-dir dist/scripts
cp src/components/mock/users.json dist/components/mock
cp package.json dist/
node ./scripts/refactor.js
