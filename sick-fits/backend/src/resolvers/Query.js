const {forwardTo} = require('prisma-binding')
const Query = {
  items: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  async item(parent, args, ctx, info) {
    const item = await ctx.db.query.item(
      {
        data: {
          ...args,
        },
      },
      info
    );
    return item;
  },
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
};

module.exports = Query;
