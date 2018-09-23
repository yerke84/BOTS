var delay = require('delay');
var searcher = require("./searcher.js");
var url = 'https://kolesa.kz/cars/almaty/?price[to]=2200000&year[from]=2010&auto-emergency=1&auto-car-transm=2345&sort_by=add_date-desc&page=';
var excludeBrands = ['Daewoo', 'Chana', 'ВАЗ (Lada)', 'ЗАЗ', 'Renault', 'Renault Samsung', 'Opel', 'Geely', 'Lifan', 'FAW', 'BYD', 'MG'];
for(var page = 0; page < 5; page++) {
  searcher.search(url + String(page), excludeBrands);
}
