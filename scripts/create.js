#!/usr/bin/env node
const fs = require('fs');
const package_json = JSON.parse(fs.readFileSync('./package.json', 'UTF-8'));
fs.writeFileSync(
  './package.json',
  JSON.stringify(package_json, null, 2),
  'utf8'
);
