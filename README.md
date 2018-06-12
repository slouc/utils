
# Utils

#pdfToBase64Encoding
This small project takes a pdf url and pdf filename and converts it into a file with base64EncodedString

#Usage index.js

This file takes a fileUrl and a fileName as arguments as shown below
  node index.js --fileUrl http://www.pdf995.com/samples/pdf.pdf --fileName=pdf.pdf
The Pdf is downloaded in foler downloads and the base64encoded txt file is stored in folder base64Encoded

Steps to execute 
1. Clone repository 
2. Run npm install
3. Run command `node index.js --fileUrl http://www.pdf995.com/samples/pdf.pdf --fileName=pdf.pdf`

#Usage clientPdfToBase64.js

This file takes a fileUrl as shown below 
  node clientPdfToBase64.js --fileUrl http://www.pdf995.com/samples/pdf.pdf
  
This does not download the file to the filesystem  but just makes sure that the base64Encoding is printed out for the file on the console.

Steps to execute 
1. Clone repository 
2. Run npm install
3. Run command `node clientPdfToBase64.js --fileUrl http://www.pdf995.com/samples/pdf.pdf --fileName=pdf.pdf`

#csvToJsonParser.js 
This file takes a fifilePath as shown below 
  node csvToJsonParser.js --path csv/test.csv

This right now just prints out the json on the terminal.

Steps to execute 
1. Clone repository 
2. Run npm install
3. Run command `node csvToJsonParser.js --path csv/test.csv`
