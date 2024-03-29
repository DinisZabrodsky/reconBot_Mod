module.exports = async ctx => {
  let group

  if (!ctx.session.channelInfo.info) group = await ctx.db.Group.findOne({ group_id: ctx.chat.id })
  else group = ctx.session.channelInfo.info

  if (!group) {
    group = new ctx.db.Group()
    group.group_id = ctx.chat.id
  }

  group.title = ctx.chat.title
  group.username = ctx.chat.username
  group.settings = group.settings || new ctx.db.Group().settings

  if (!group.username && !group.invite_link) {
    // group.invite_link = await ctx.telegram.exportChatInviteLink(ctx.chat.id).catch(() => {})
  }

  if (ctx.i18n.languageCode === '-') {
    let lang = 'uk'
    if (ctx.from.language_code) lang = ctx.from.language_code
    ctx.i18n.locale(lang)
  }

  group.updatedAt = new Date()
  ctx.session.channelInfo.info = group
  if (ctx.session.channelInfo.info.settings.locale) ctx.i18n.locale(ctx.session.channelInfo.info.settings.locale)
  else if (ctx.i18n.languageCode) {
    ctx.session.channelInfo.info.settings.locale = ctx.i18n.shortLanguageCode ? ctx.i18n.shortLanguageCode : ctx.i18n.languageCode
    await group.save()
  }

  return true
}
