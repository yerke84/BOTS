//main includes
const Telegraf = require('telegraf')
const Router = require('telegraf/router')
const session = require('telegraf/session')
const express = require('express')
const functions = require('./functions/functions')

//include configs
const format = require('string-format')
const config = require('nconf')
config.file('def', {file: './config/default.json'})
config.file('tkn', {file: './config/token.json'})

//TO-DO check registration
const isRegistered = true;

//buttons
const buttons = require('./functions/buttons');
const main_menu_buttons = buttons.main_menu_buttons();
const alfa_site_url_buttons = buttons.alfa_site_url_buttons();
const active_tasks_navigate_buttons = buttons.active_tasks_navigate_buttons();
const closed_tasks_navigate_buttons = buttons.closed_tasks_navigate_buttons();

//starting
const TOKEN = config.get('token')
const bot = new Telegraf(TOKEN)
bot.use(Telegraf.log())
bot.telegram.setWebhook(config.get("tunnel") + config.get('path'))
const app = express()
app.get('/', (req, res) => res.send('Hello World !!!'))
app.use(bot.webhookCallback(config.get('path')))
const port = config.get('port')
app.listen(port, () => {
  console.log('Example app listening on port ' + port + '!')
})

bot.use(session({ ttl: 10 }))
bot.catch((err) => {
  console.log('Error: ', err)
})

bot.start((ctx) => {
  if(isRegistered) {
    return functions.reply(ctx, config.get('hello') + ', <b>' + ctx.from.first_name + '</b>!\n' + config.get('main_menu_txt'), main_menu_buttons)
  } else {
    return functions.unRegisteredText(ctx, config.get('hello') + ', <b>' + ctx.from.first_name + '</b>!\n')
  }
})

//help
bot.help((ctx) => {
  if(isRegistered) {
    return functions.reply(ctx, config.get('help_text'), alfa_site_url_buttons)
  } else {
    return functions.unRegisteredText(ctx, '')
  }
})

//menu
bot.command('/menu', (ctx) => {
  if(isRegistered) {
    return functions.reply(ctx, config.get('main_menu_txt'), main_menu_buttons)
  } else {
    return functions.unRegisteredText(ctx, '')
  }
})

//open_task
bot.hears(/^\/open_task_([0-9]+)$/, (ctx) => {
  if(isRegistered) {
    return functions.reply(ctx, '|' + ctx.match[1] + '|', null)
  } else {
    return functions.unRegisteredText(ctx, '')
  }
})

//call backs
const myRouter = new Router(({ callbackQuery }) => {
  if (!callbackQuery.data) {
    return
  }
  const cbqData = callbackQuery.data
  return {
    route: cbqData,
    state: {
      value : ''
    }
  }
})

//to main menu
myRouter.on('to_main_menu', (ctx) => {
  if(isRegistered) {
    return functions.reply(ctx, config.get('main_menu_txt'), main_menu_buttons)
  } else {
    return functions.unRegisteredText(ctx, '')
  }
})

//to my active tasks list
myRouter.on('to_my_active_tasks_list', (ctx) => {
  if(isRegistered) {
    ctx.session.active_tasks_list = 1;
    const body = functions.getActiveTasks(ctx.session.active_tasks_list);
    return functions.reply(ctx, config.get('active_tasks_list') + '\n' + body, active_tasks_navigate_buttons)
  } else {
    return functions.unRegisteredText(ctx, '')
  }
})

myRouter.on('my_active_tasks_back', (ctx) => {
  if(isRegistered) {
    ctx.session.active_tasks_list--;
    if(!ctx.session.active_tasks_list){ctx.session.active_tasks_list = 1}
    const body = functions.getActiveTasks(ctx.session.active_tasks_list);
    return functions.editMessageText(ctx, config.get('active_tasks_list') + '\n' + body, active_tasks_navigate_buttons)
  } else {
    return functions.unRegisteredText(ctx, '')
  }
})

myRouter.on('my_active_tasks_forward', (ctx) => {
  if(isRegistered) {
    ctx.session.active_tasks_list++;
    if(!ctx.session.active_tasks_list){ctx.session.active_tasks_list = 1}
    const body = functions.getActiveTasks(ctx.session.active_tasks_list);
    return functions.editMessageText(ctx, config.get('active_tasks_list') + '\n' + body, active_tasks_navigate_buttons)
  } else {
    return functions.unRegisteredText(ctx, '')
  }
})

//to my closed tasks list
myRouter.on('to_my_closed_tasks_list', (ctx) => {
  if(isRegistered) {
    ctx.session.closed_tasks_list = 1;
    const body = functions.getClosedTasks(ctx.session.closed_tasks_list);
    return functions.reply(ctx, config.get('closed_tasks_list') + '\n' + body, closed_tasks_navigate_buttons)
  } else {
    return functions.unRegisteredText(ctx, '')
  }
})

myRouter.on('my_closed_tasks_back', (ctx) => {
  if(isRegistered) {
    ctx.session.closed_tasks_list--;
    if(!ctx.session.closed_tasks_list){ctx.session.closed_tasks_list = 1}
    const body = functions.getClosedTasks(ctx.session.closed_tasks_list);
    return functions.editMessageText(ctx, config.get('closed_tasks_list') + '\n' + body, closed_tasks_navigate_buttons)
  } else {
    return functions.unRegisteredText(ctx, '')
  }
})

myRouter.on('my_closed_tasks_forward', (ctx) => {
  if(isRegistered) {
    ctx.session.closed_tasks_list++;
    if(!ctx.session.closed_tasks_list){ctx.session.closed_tasks_list = 1}
    const body = functions.getClosedTasks(ctx.session.closed_tasks_list);
    return functions.editMessageText(ctx, config.get('closed_tasks_list') + '\n' + body, closed_tasks_navigate_buttons)
  } else {
    return functions.unRegisteredText(ctx, '')
  }
})

bot.on('callback_query', myRouter)
