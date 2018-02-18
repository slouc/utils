'use strict';

let arg = require('minimist')(process.argv.slice(2));
const http = require("http")

const getFileContents = (fileUrl, cb) => {
  var data = "";
  http.get(fileUrl, function(res) {
    res.setEncoding('base64');
    const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];

    if (statusCode !== 200) {
      console.error(`Request Failed with Status Code: ${statusCode}`)
    } else {
      console.info(`Response from url  = ${statusCode}`);
      console.log(`File content type header from url ${contentType}`)
    }


    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      return cb(data);
    })
  }).on('error', function(err) {
    console.error(`Error from loading the file ${fileUrl}`, err);
    return cb(err, null)
  });
};


if (arg.fileUrl) {
  const fileUrl = arg.fileUrl;
  getFileContents(fileUrl, (err, base64String) => {
    if(err) {
      console.error(`Error from fetching the file ${fileUrl}`, err);
    } else {
      console.log(`Base64String = ${base64String}`)
    }
  })
} else {
  console.log("Please provide file url argument '--fileUrl'");
  return;
}