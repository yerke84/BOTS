const express = require('express')
const app = express()
const searcher = require("./searcher.js")
const router = express.Router()
const port = 3000;

var mainExcludeBrands = ['ГАЗ', 'Dong Feng'];

//home
router.get('/', function (req, res) {
  res.sendFile('index.html', {root : __dirname});
})

//matiz
router.get('/matiz', async function (req, res) {
  var url = 'https://kolesa.kz/cars/almaty/?price[to]=2200000&year[from]=2010&auto-emergency=1&auto-car-transm=2345&sort_by=add_date-desc&page=';
  var excludeBrands = mainExcludeBrands.concat(['Changan', 'Foton', 'УАЗ', 'Chana', 'ВАЗ (Lada)', 'ЗАЗ', 'Renault', 'Renault Samsung', 'Opel', 'Geely', 'Lifan', 'FAW', 'BYD', 'MG']);
  var excludeModels = ['Cami']
  var ret = '<a href="javascript:history.back()">Назад</a><br/><br/>';
  for(var page = 1; page <= 5; page++) {
    var ss = await searcher.search(url + String(page), excludeBrands, excludeModels);
    ret = ret + ss;
  }
  res.send(ret);
})

//notmatiz
router.get('/notmatiz', async function (req, res) {
  var url = 'https://kolesa.kz/cars/almaty/?price[to]=2200000&year[from]=2010&auto-emergency=1&auto-car-transm=2345&sort_by=add_date-desc&page=';
  var excludeBrands = mainExcludeBrands.concat(['Changan', 'Foton', 'УАЗ', 'Chana', 'Daewoo', 'ВАЗ (Lada)', 'ЗАЗ', 'Renault', 'Renault Samsung', 'Opel', 'Geely', 'Lifan', 'FAW', 'BYD', 'MG']);
  var excludeModels = ['Cami']
  var ret = '<a href="javascript:history.back()">Назад</a><br/><br/>';
  for(var page = 1; page <= 5; page++) {
    var ss = await searcher.search(url + String(page), excludeBrands, excludeModels);
    ret = ret + ss;
  }
  res.send(ret);
})

//forfather
router.get('/forfather', async function (req, res) {
  var url = 'https://kolesa.kz/cars/almaty/?price[to]=2200000&year[from]=2010&auto-emergency=1&sort_by=add_date-desc&page=';
  var excludeBrands = mainExcludeBrands.concat(['Foton', 'УАЗ', 'Chana', 'ВАЗ (Lada)', 'ЗАЗ', 'Geely', 'Lifan', 'FAW', 'BYD', 'MG', 'Datsun', 'Changan']);
  var excludeModels = ['Niva', 'Matiz', 'Samand', 'Matiz Creative'];
  var ret = '<a href="javascript:history.back()">Назад</a><br/><br/>';
  for(var page = 1; page <= 10; page++) {
    var ss = await searcher.search(url + String(page), excludeBrands, excludeModels);
    ret = ret + ss;
  }
  res.send(ret);
})

//forfatherNoNexia
router.get('/forfatherNoNexia', async function (req, res) {
  var url = 'https://kolesa.kz/cars/almaty/?price[to]=2200000&year[from]=2010&auto-emergency=1&sort_by=add_date-desc&page=';
  var excludeBrands = mainExcludeBrands.concat(['Foton', 'УАЗ', 'Chana', 'ВАЗ (Lada)', 'ЗАЗ', 'Geely', 'Lifan', 'FAW', 'BYD', 'MG', 'Datsun', 'Changan']);
  var excludeModels = ['Niva', 'Matiz', 'Samand', 'Nexia', 'Matiz Creative'];
  var ret = '<a href="javascript:history.back()">Назад</a><br/><br/>';
  for(var page = 1; page <= 10; page++) {
    var ss = await searcher.search(url + String(page), excludeBrands, excludeModels);
    ret = ret + ss;
  }
  res.send(ret);
})

//forfatherNoNexia
router.get('/toyota-land-cruiser-prado', async function (req, res) {
  var url = 'https://kolesa.kz/cars/toyota/land-cruiser-prado/almaty/?auto-emergency=1&auto-car-volume[to]=3&price[to]=7000000&year[from]=2010&sort_by=add_date-desc&page=';
  var excludeBrands = mainExcludeBrands.concat(['']);
  var excludeModels = [''];
  var ret = '<a href="javascript:history.back()">Назад</a><br/><br/>';
  for(var page = 1; page <= 2; page++) {
    var ss = await searcher.search(url + String(page), excludeBrands, excludeModels);
    ret = ret + ss;
  }
  res.send(ret);
})


//
app.use('/', router)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
