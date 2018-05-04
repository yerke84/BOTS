const format = require('string-format');
var config = require('nconf');
config.file('def', {file: './config/default.json'});
config.file('tkn', {file: './config/token.json'});
var TOKEN = config.get('token');
var TelegramBot = require('node-telegram-bot-api');

// Включить опрос сервера
var bot = new TelegramBot(TOKEN, {polling: true, request : {proxy : config.get('proxy')}, polling: {params: {timeout : 300}}});

//TO-DO check registration
var isRegistered = true;

// Начать
bot.onText(/\/start/, function (msg, match) {	
	if(isRegistered) {				
		bot.sendMessage(
				getChatId(msg),
				config.get('hello') + ', ' + msg.from.first_name + '!\n' + config.get('main_menu_txt'),
			    getMenu(config.get('main_menu_buttons'))
		);				
	} else {		
		bot.sendMessage(
				getChatId(msg), 
				config.get('hello') + ', <b>' + msg.from.first_name + '</b>!\n' + format(config.get("telegram_id"), msg.from.id), 
				{parse_mode : "HTML"}
		);		
	}	
});

// Основное меню
bot.onText(/\/menu/, function (msg, match) {
	if(isRegistered) {		
		bot.sendMessage(
				getChatId(msg),
				config.get('main_menu_txt'),
			    getMenu(config.get('main_menu_buttons'))
		);
	} else {		
		bot.sendMessage(
				getChatId(msg), 
				format(config.get("telegram_id"), msg.from.id), 
				{parse_mode : "HTML"}
		);		
	}
});

//Помощь
bot.onText(/\/help/, function (msg, match) {  
  if(isRegistered) {
	  bot.sendMessage(
				getChatId(msg),
				config.get('help_text'),
			    getMenu(config.get('alfa_site_url_buttons'))
		);	  
	} else {		
		bot.sendMessage(
				getChatId(msg), 
				format(config.get("telegram_id"), msg.from.id), 
				{parse_mode : "HTML"}
		);		
	}  
});

// Обработка событии
bot.on('callback_query', function (msg) {
  var chatId = getChatId(msg);

  switch (msg.data) {
    case 'to_find_process_by_instanse_id':
      bot.sendMessage(
        chatId,
        config.get('main_menu_txt'),
        getMenu(config.get('search_menu_buttons'))
      );
      break;
    case 'to_main_menu':
      bot.sendMessage(
        chatId,
        config.get('main_menu_txt'),
        getMenu(config.get('main_menu_buttons'))
      );
      break;
    default:
      bot.answerCallbackQuery(msg.id, 'Вы выбрали: ' + msg.data, false);
  }
  
});

//-----------------

function getChatId(msg) {
  return msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
}

function getMenu(arr_buttons) {
	  return options = {
	    reply_markup: JSON.stringify({
	      inline_keyboard: arr_buttons,
	      parse_mode: 'Markdown'
	    })
	  };
}