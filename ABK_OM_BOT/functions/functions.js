const active_tasks_sample = require('../debug/active_tasks_sample')
const closed_tasks_sample = require('../debug/closed_tasks_sample')

const config = require('nconf')
config.file('def', {file: './config/default.json'})
config.file('tkn', {file: './config/token.json'})

exports.unRegisteredText = function (ctx, prefix) {
  const txt = prefix + format(config.get("telegram_id"), ctx.from.id)
  return ctx.reply(txt, Extra.HTML())
}

exports.reply = function (ctx, txt, buttons) {
  return ctx.reply(txt, buttons)
}

exports.editMessageText = function (ctx, txt, buttons) {
  return ctx.editMessageText(txt, buttons).catch(() => undefined)
}

exports.getActiveTasks = function (index) {
  console.log('A ' + index)
  return parser(active_tasks_sample, 0x1F4D7)
}

exports.getClosedTasks = function (index) {
  console.log('C ' + index)
  return parser(closed_tasks_sample, 0x1F4D8)
}

function parser(json, icon) {
  var ss = '';
  if(json.RETCODE > -1) {
    const arr = json.RESPONSE;
    const n = arr.length;
    for(var i = 0; i < n; i++) {
      ss = ss + String.fromCodePoint(icon) + ' ' + arr[i].SUBJECT + '\n' + config.get("open_task") + arr[i].TASK_ID;
      if(i < (n -1)){ss = ss + '\n\n'}
    }
    return ss;
  } else {
    return config.get("parse_error") + '\n' + json.RETTEXT;
  }
}
