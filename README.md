# Content_Scraper
Content-Scraper is a Node.js command line application.

## What does it do?
Connect to the website http://shirts4mike.com
Get the latest products details (price, title, url and image url)
Save the products to a spreadsheet (CSV format) inside the data folder
> (will be created if not found)

## Tech
Content-Scraper uses a number of open source projects to work properly:

* Request - Simplified HTTP request client.
* NodeJS - Running the backend.
* Cheerio - Fast, flexible & lean implementation of core jQuery designed specifically for the server.
* FS - Export a JSON array to CSV.
* json2csv - Json to CVS parser package to conver json data into a csv format.
* JSHint - Static analysis tool for JavaScript.
> Those projects were chosen because they're very popular and have a great documentations.

## Installation
### Install the dependencies and devDependencies and run the application.
> In your terminal navigate to projects root dir (./) then follow install.
```
npm i brandonv_content_scraper
```
```
$ npm install
```
```
$ npm start
```
## For production environments...

```
$ NODE_ENV=production npm install
```
```
$ npm start
```
## Linting tool only in dev mode
Run this line to check your code for syntax errors

```
$ npm run error-report
```
## Error handling
All errors will be stored into a dir called "error-logs".  
Open the "scrapper-log" file, which will have more detail on the error along with the date && time of the error.
> (will be created if not found)

## License
MIT
![MIT](https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667)

Free Software, Yay!!
