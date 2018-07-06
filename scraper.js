// use 'esversion: 6';

var cheerio = require('cheerio');
var fs = require('fs');
var request = require("request");

function shirt(req, response) {
     // Scraper call config.
    var config = {
      url: 'http://shirts4mike.com/shirts.php/',
      method: "GET",
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10,
      url2: 'http://shirts4mike.com/',
      errMsg: 'Some error occured - file either not saved or corrupted file saved. Please check "./error-logs" to see more.',
      dateTime: new Date()
    };
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
                  var shirt = {};

                  shirt.price = $('.price').text();
                  shirt.title = $('title').text();
                  shirt.href = shirtUrl;
                  shirt.imageUrl = config.url2 + $('.shirt-picture img').attr('src');

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
                    saveData(shirts.sort(compare));
                  } else {
                    console.log('Loading data...... ', shirts.length, ' of ', href.length, 'files loaded.');
                  }
            }); // End of request call;
          });
        }
        if (error) {
          errorMsg(config.errMsg, config.dateTime, err);
        }
      });
      // // NOTE: Save data to .csv file.
          function saveData (data) {
            this.data = data;
            var fs = require('fs');

              var dataToWrite = '';
              var newRow = ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,';

                for (var i = 0; i < data.length; i++) {
                   dataToWrite +=
                      data[i].title  + ',' +
                      data[i].price + ',' +
                      data[i].href  + ',' +
                      data[i].imageUrl +
                      newRow + '\n';
                }
                // Check if data holds real data.
                if (dataToWrite) {
                  // Write and save file.
                  var today = new Date();
                  var dd = today.getDate();
                  var mm = today.getMonth()+1; //January is 0!
                  var yyyy = today.getFullYear();
                  var fileDateCreated = `${yyyy}-${mm}-${dd}`;
                  var dir = './data';
                  //
                  // Create dir if does not exist.
                  if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                  }
                  // Write data to a .csv file formate with the date it was created.
                  fs.writeFile(`./data/${fileDateCreated}.csv`, dataToWrite, 'utf8', function (err) {
                    if (err) {
                      var errLog = './error-logs';
                      var errorMessage = `${fileDateCreated} --> ${config.errMsg}, ${err}`;
                        errorMsg(config.errMsg, config.dateTime, err);
                      if (!fs.existsSync(errLog)){
                        fs.mkdirSync(errLog);
                      }
                      fs.writeFile(`${errLog}/${fileDateCreated}.txt`, errorMessage, 'utf8', function (err) {
                        if (err) {
                          errorMsg(config.errMsg, config.dateTime, err);
                        }
                      });
                    } else {
                      console.log(`File saved successfully! You can view the data file saved at ./data/${fileDateCreated}`);
                      response.end();
                    }
                  });
                }
          }

}

function errorMsg (message, timeStamp, err) {
  var errLog = './error-logs';
  var errorMessage = `${timeStamp} --> ${message}, \n ${err}`;
  console.error(message);
  if (!fs.existsSync(errLog)){
    fs.mkdirSync(errLog);
  }
  fs.writeFile(`${errLog}/${timeStamp}.txt`, errorMessage, 'utf8', function (err) {
    if (err) {
      console.log('error', err);
    }
  });
}

module.exports.shirt = shirt;
