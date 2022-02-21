/* eslint-disable no-console */
const fs = require('fs');

function setCurrentDatetime(){
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();

  if(day < 10) day = `0${day}`;
  if(month < 10) month = `0${month}`;
  if(hours < 10) hours = `0${hours}`;
  if(minutes < 10) minutes = `0${minutes}`;
  return `_${day}/${month}/${year}_${hours}:${minutes}`;
}

const fileToReplace = 'dist/challenge-autoclicker.js';
console.log("replace script Starting!");
console.log("replacing challenge-autoclicker.js file!");
fs.readFile(fileToReplace, 'utf8', (err,data) => {
  if (err) {
    return console.log(err);
  }

  let result = data.replace('environment: "local"', 'environment: "dev"');
  result = result.replace('/firebase-messaging-sw.js', '/src/service-worker.js');
  result = result.replace('/firebase-cloud-messaging-push-scope', '/');

  fs.writeFile(fileToReplace, result, 'utf8', (error) => {
    if (err) return console.log(error);
  });
});

const fileIndexToReplace = 'dist/index.html';
console.log("replacing index.html file!");
fs.readFile(fileIndexToReplace, 'utf8', (err,data) => {
  if (err) {
    return console.log(err);
  }

  const replacerRoute = new RegExp('/src/', 'g');
  let result = data.replace('./challenge-autoclicker.js', '/challenge-autoclicker.js');
  result = result.replace(replacerRoute, '/');
  fs.writeFile(fileIndexToReplace, result, 'utf8', (error) => {
    if (err) return console.log(error);
  });
});

const fileSWToReplace = 'dist/sw.js';
console.log("replacing service-worker.js file!");
fs.readFile(fileSWToReplace, 'utf8', (err,data) => {
  if (err) {
    return console.log(err);
  }
  const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const datetime = setCurrentDatetime()
  console.log(random);
  const result = data.replace('v1', random + datetime);
  fs.writeFile(fileSWToReplace, result, 'utf8', (error) => {
    if (err) return console.log(error);
    return console.log("replace script Finished!");
  });
});
