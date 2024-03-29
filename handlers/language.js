const fs = require('fs')
const path = require('path')
const Composer = require('telegraf/composer')
const Markup = require('telegraf/markup')
const I18n = require('telegraf-i18n')

const composer = new Composer()

const i18n = new I18n({
  directory: path.resolve(__dirname, '../locales'),
  defaultLanguage: 'uk',
  defaultLanguageOnMissing: true
})

const setLanguage = async (ctx, next) => {
  const localseFile = fs.readdirSync('./locales/')

  const locales = {}

  localseFile.forEach((fileName) => {
    const localName = fileName.split('.')[0]
    locales[localName] = {
      flag: i18n.t(localName, 'language_name')
    }
  })

  if (ctx.updateType === 'callback_query') {
    if (locales[ctx.match[1]]) {
      ctx.state.answerCbQuery = [locales[ctx.match[1]].flag]

      ctx.session.userInfo.settings.locale = ctx.match[1]
      ctx.i18n.locale(ctx.match[1])
      ctx.state.sendHelp = true
      await next(ctx)
    }
  } else {
    const button = []

    Object.keys(locales).map((key) => {
      button.push(Markup.callbackButton(locales[key].flag, `set_language:${key}`))
    })

    ctx.reply('UK Виберіть будьласка мову\n🇺🇸 Choose language\n\nHelp with translation: https://crwd.in/reacombot', {
      reply_markup: Markup.inlineKeyboard(button, {
        columns: 2
      })
    })
  }
}

composer.on('message', Composer.privateChat((ctx, next) => {
  if (ctx.i18n.languageCode === '-') return setLanguage(ctx, next)
  return next()
}))

composer.command('lang', setLanguage)
composer.action(/set_language:(.*)/, setLanguage)

module.exports = composer
