// use 'esversion: 6';
var cheerio = require('cheerio');
var fs = require('fs');
var request = require("request");
var colors = require('colors');
const Json2csvParser = require('json2csv').Parser;
const Json2csvTransform = require('json2csv').Transform;

var errorHandling = {
  errMsg: 'Error occured - Please check "./error-logs" to see more details.',
};

function shirt(req, response) {
     // Scraper call config.
    var config = {
      url: 'http://shirts4mike.com/shirts.php/',
      method: "GET",
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10,
      url2: 'http://shirts4mike.com/',
      errMsg: 'Error occured - Please check "./error-logs" to see more details.',
      dateTime: new Date()
    };
      var today = config.dateTime;
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      var fileDateCreated = `${yyyy}-${mm}-${dd}`;

      // Autogenerated, do not edit. All changes will be undone.
      request(
        config,
        function(error, response, body) {
          var shirts = [];

        if (!error && response.statusCode === 200) {
          var $ = cheerio.load(body);

          var href = $('ul.products li a');
          href.each(function() {
              var shirtUrl = config.url2 + $(this).attr('href');

              request(shirtUrl, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                  var $ = cheerio.load(body);
                  //  // NOTE:loop to collect and store data from each product.
                  var shirt = {};

                  shirt.price = $('.price').text();
                  shirt.title = removeComma($('title').text());
                  shirt.href = shirtUrl;
                  shirt.imageUrl = config.url2 + $('.shirt-picture img').attr('src');
                  shirt.timestamp = `${fileDateCreated}`;

                  // // NOTE: Delete comma from title;
                  function removeComma(title) {
                    var comma = title.search(','); // Find comma.
                    color = title.slice(comma + 1);
                    titleBeforeComma = title.slice(0, comma);
                    title = titleBeforeComma + color; // Return a full title with no comma.
                    return title;
                  }
                  // Push shirt data to shirts array.
                  shirts.push(shirt);
                }

                if (href.length === shirts.length) {
                  // // NOTE: Sort by shirt link number values starting at one.
                  function compare(a, b) {
                    if (a.href < b.href)
                      return -1;
                    if (a.href > b.href)
                      return 1;
                      return 0;
                    }
                    console.log('Loading data...... ', `${shirts.length}`.green, ' of ', `${href.length}`.green, 'files loaded.');
                    saveData(shirts.sort(compare));
                  } else {
                    console.log('Loading data...... ', `${shirts.length}`.cyan, ' of ', `${href.length}`.green, 'files loaded.');
                  }
            }); // End of request call;
          });
        }
        if (error || response.statusCode !== 200) {
          console.error('Error', response.statusCode);
          errorMsg('Please check url ', config.dateTime, 'Bad gate way error ' + response.statusCode, error);
        }
      });
      // // NOTE: Save data to .csv file.
    function saveData (data) {
    var dir = './data';

    // Product title fields.
    const fields = ['title', 'price', 'href', 'imageUrl', 'timestamp'];
    const opts = data; // Product data.

    const json2csvParser = new Json2csvParser({ fields, quote: '' });
    const csv = json2csvParser.parse(opts); // parse for CSV format.
      // Write and save file.
      // Create dir if does not exist.
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      fs.writeFile(`./data/${fileDateCreated}.csv`, csv, 'utf8', function (err) {
        if (err) {
          var errLog = './error-logs';
          var errorMessage = `${fileDateCreated} --> ${errorHandling.errMsg}, ${err}`;
            errorMsg(errorHandling.errMsg, config.dateTime, err);
          if (!fs.existsSync(errLog)){
            fs.mkdirSync(errLog);
          }
          fs.writeFile(`${errLog}/${fileDateCreated}.txt`, errorMessage, 'utf8', function (err) {
            if (err) {
              errorMsg(errorHandling.errMsg, config.dateTime, err);
            }
          });
        } else {
          console.log(`File saved successfully! You can view the data file saved at ./data/${config.dateTime.fileDateCreated}`.green);
        }
      });
    }
}
// NOTE: Handle error stacks.
function errorMsg (message, timeStamp, err) {
  var errLog = './error-logs';
  var fileName = 'scraper-log';
  var errorMessage = `${timeStamp} --> ${message}, \n ${err}`;
  console.error(errorHandling.errMsg.underline.red);
  if (!fs.existsSync(errLog)){
    fs.mkdirSync(errLog);
  }
  fs.writeFile(`${errLog}/${fileName}.txt`, errorMessage, 'utf8', function (err) {
    if (err) {
      console.log('error!! -->'.underline.red, err);
    }
  });
}

async function asyncCall() {
  console.log('Running call : '.cyan, 'Loading.......'.green);
  var result = await shirt();
}

asyncCall();


module.exports.shirt = shirt;
