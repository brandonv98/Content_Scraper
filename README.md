# Content_Scraper
Content-Scraper is a Node.js command line application.

## What does it do?
Connect to the website http://shirts4mike.com
Get the latest products details (price, title, url and image url)
Save the products to a spreadsheet (CSV format) inside the data folder (will be created if not found)
## Tech
Content-Scraper uses a number of open source projects to work properly:

Request - Simplified HTTP request client.
NodeJS - Running the backend.
Cheerio - Fast, flexible & lean implementation of core jQuery designed specifically for the server.
FS - Export a JSON array to CSV.
JSHint - Static analysis tool for JavaScript.
Those projects were chosen because they're very popular and have a great documentations.

## Installation
Install the dependencies and devDependencies and run the application.

$ npm install
$ npm start
## For production environments...

$ NODE_ENV=production npm install
$ npm start
## Linting tool only in dev mode
Run this line to check your code for syntax errors

$ npm run error-report

## License
MIT

Free Software, Yay!!
