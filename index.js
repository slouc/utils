const arguments = require('minimist')(process.argv.slice(2));
const fs = require("fs");
const request = require("request");
const config = {
  directoryPath : (filename) =>  `./downloads/${filename}`,
  base64EncodedPath: (filename) =>  `./base64Encoded/${filename}`
};
const base64 = require('file-base64');

const downloadFile = (fileUrl, fileName, filePath) => {
  return new Promise((resolve, reject) => {
    let fileWriteStream = fs.createWriteStream(filePath);

    request
      .get(fileUrl)
      .on('response', function (response) {
        console.info(`Response from url  = ${response.statusCode}`);
        console.log(`File content type header from url ${response.headers['content-type']}`)
      })
      .on('error', function (err) {
        console.error(`Error from loading the file ${fileUrl}`, err);
        return reject(err);
      })
      .pipe(fileWriteStream);

    fileWriteStream.on('error', function (err) {
      console.error(`Error while piping file to path = ${filePath}`, err);
      fs.unlink(filePath);
      return reject(err);
    });

    fileWriteStream.on('finish', function () {
      console.info(`File download finished on path ${filePath}`);
      fileWriteStream.close(() => {
        return resolve(filePath);
      });
    });
  })
};

const encodeBase64 = (fetchFilePath, fileName) => {
  return new Promise((resolve, reject) => {
    const p = `${fileName.split(".")[0]}.txt`;
    const encodeFilePath = config.base64EncodedPath(p);

    base64.encode(fetchFilePath, function(err, base64String) {
      fs.writeFile(encodeFilePath, base64String, function(err) {
        if(err) {
          console.error(`Error while saving base64 text file for file = ${fetchFilePath}`);
          return reject(err);
        } else {
          console.info(`Base64 encoded stirng file saved at path = ${encodeFilePath}`);
          return resolve(p);
        }
      })
    });
  });
};


if (arguments.fileUrl && arguments.fileName) {
  const fileUrl = arguments.fileUrl;
  const fileName = arguments.fileName;
  const filePath = config.directoryPath(fileName);
  return downloadFile(fileUrl, fileName, filePath).then(r => {
    return encodeBase64(filePath, fileName)
  }).catch(e => {
    console.error(`Pdf conversion failed please check logs`, e.stack)
  })

} else {
  console.log("Please provide file url argument '--fileUrl' and '--fileName'");
  return;
}







