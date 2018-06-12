'use strict';

const csvToJson = require("csvtojson/v2");
let arg = require('minimist')(process.argv.slice(2));


if (arg.path) {
    let csvFilePath = arg.path;
    csvToJson()
        .fromFile(csvFilePath)
        .then(jsonObj => {
            console.log(`JSON = ${JSON.stringify(jsonObj)}`)
        }).catch(e => {
            console.error(`Error while processing file ${csvFilePath} with error = ${e}`)
    })
} else {
    console.log("Please provide file url argument '--path'");
    return;
}
