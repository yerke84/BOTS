const format = require('string-format')
const { Extra } = require('telegraf');
const V_TELEGRAM_TASKS = require('../debug/V_TELEGRAM_TASKS')

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
  return getTasks(true, index);
}

exports.getClosedTasks = function (index) {
  return getTasks(false, index);
}

exports.findProcessTasksByInstanseId = function (ctx, instanseId) {
  return ctx.reply('Searching ' + instanseId);
  //return ctx.reply(config.get('enter_instance_id'), Extra.HTML());
}

function getTasks(isActive, index) {

  const json = V_TELEGRAM_TASKS;
  const arr = json.RESPONSE;
  const all = arr.length;
  const icon = isActive ? 0x1F4D7 : 0x1F4D8;
  const start = (index * 3) - 3;
  const end = (index * 3) - 1;

  var ss = format(config.get("page"), index, all);
  if(json.RETCODE > -1) {
    for(var i = start; i < end + 1; i++) {
      ss = ss + String.fromCodePoint(icon) + ' ' + arr[i].SUBJECT + '\n' + config.get("open_task") + arr[i].TASK_ID;
      if(i < (end)) {ss = ss + '\n\n'}
    }
    return ss;
  } else {
    return config.get("parse_error") + '\n' + json.RETTEXT;
  }
}
