const Extra = require('telegraf/extra')
const config = require('nconf')
config.file('def', {file: './config/default.json'})
config.file('tkn', {file: './config/token.json'})

exports.main_menu_buttons = function () {
    const arr = config.get('main_menu_buttons')
    return Extra
      .HTML()
      .markup((m) => m.inlineKeyboard([
        m.callbackButton(String.fromCodePoint(0x1F4D7) + ' ' + arr[0].text, arr[0].callback_data),
        m.callbackButton(String.fromCodePoint(0x1F4D8) + ' ' + arr[1].text, arr[1].callback_data),
        m.callbackButton(String.fromCodePoint(0x1F50E) + ' ' + arr[2].text, arr[2].callback_data)
      ], {columns: 1}))
  }

exports.alfa_site_url_buttons =  function () {
    const arr = config.get('alfa_site_url_buttons')
    return Extra
        .HTML()
        .markup((m) => m.inlineKeyboard([
          m.urlButton(String.fromCodePoint(0x1F170) + ' ' + arr[0].text, arr[0].url),
          m.callbackButton(String.fromCodePoint(0x1F519) + ' ' + arr[1].text, arr[1].callback_data)
        ], {columns: 2}))
  }

exports.active_tasks_navigate_buttons = function () {
    const arr = config.get('active_tasks_navigate_buttons')
    return Extra
      .HTML()
      .markup((m) => m.inlineKeyboard([
        m.callbackButton(String.fromCodePoint(0x2B05), arr[0].callback_data),
        m.callbackButton(String.fromCodePoint(0x27A1), arr[1].callback_data)
      ], {columns: 2}))
  }

exports.closed_tasks_navigate_buttons = function () {
    const arr = config.get('closed_tasks_navigate_buttons')
    return Extra
      .HTML()
      .markup((m) => m.inlineKeyboard([
          m.callbackButton(String.fromCodePoint(0x2B05), arr[0].callback_data),
          m.callbackButton(String.fromCodePoint(0x27A1), arr[1].callback_data)
      ], {columns: 2}))
  }
