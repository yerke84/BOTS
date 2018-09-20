var request = require('request');
var cheerio = require('cheerio');
var numeral = require('numeral');
var begins = 'listing.items.push(';
var ends = ');';
module.exports = {
    search: function(url, excludeBrands) {
      request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
          var $ = cheerio.load(html);
          $('script').each(function(i, element) {
            var child = element.children[0];
            if(child) {
              var data = child.data;
              if(data.includes(begins)) {
                data = data.replace(begins, '');
                data = data.replace(ends, '');
                data = data.trim();
                var json = JSON.parse(data);
                var brand = json.attributes.brand;
                if(!excludeBrands.includes(brand)) {
                  console.log(brand + ' ' + json.attributes.model + '; ' + numeral(json.unitPrice).format('0,0') + '; ' + json.url);
                }
              }
            }
          });
        } else {
          console.log(error);
        }
      })
    }
};
