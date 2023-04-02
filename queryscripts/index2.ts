import * as fs from 'fs';

const SQLfileContent = fs.readFileSync(__dirname+'/files/queries.sql', { encoding: 'utf-8' });

const regex = new RegExp('--'+/ [^0-9]\r\n/);
// console.log(regex.test(' AlterTable'));

var arr = SQLfileContent.toString().split(regex);
console.log(arr);