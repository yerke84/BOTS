var request = require('request');
var cheerio = require('cheerio');
var numeral = require('numeral');
var begins = 'listing.items.push(';
var ends = ');';

module.exports = {
  search: function(url, excludeBrands, excludeModels) {
    return new Promise(function(resolve, reject) {

      request(url, function (error, response, html) {
        var ss = '';
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
                  if(!excludeModels.includes(json.attributes.model)) {
                    ss = ss + '<a target="_blank" href="' + json.url + '">' + brand + ' ' + json.attributes.model + '; ' + numeral(json.unitPrice).format('0,0')
                    + '</a><br/>';
                  }
                }
              }
            }
          });
          resolve(ss)
        } else {
          reject(error)
        }
      })

    })
  }
}
