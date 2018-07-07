# Требование #
1) npm install -g localtunnel
2) sh keepLocalTunnelAbkOm.sh
3) node index.js

# TO-DO #
0) Зашифровать токен и брать через конфиг сервер
1) Перед показом пункта меню взять айдишку юзера и сверить с базой
2) Логирование
3) если нет в бд - то место меню показать айди и попросить зарегиться
4) поиск по номеру задачи
5) Навигация-получить порцию задач из бд
6) Детали таска

# CLIPBOARD #
var env = process.env.NODE_ENV;
var bot;
if(env == 'MAC') {
	bot = new TelegramBot(TOKEN, {polling: true, request : {proxy : config.get('proxy')}, polling: {params: {timeout : 300}}});
} else if(env == 'HOME') {
	bot = new TelegramBot(TOKEN, {polling: true, polling: {params: {timeout : 300}}});
}
