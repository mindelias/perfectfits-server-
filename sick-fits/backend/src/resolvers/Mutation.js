const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mutations = {
  createItem(parent, args, ctx, info) {
    const item = ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    );
    return item;
  },
  updateItem(parent, args, ctx, info) {
    //   first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    const item = ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
    return item;
  },
  async deleteItem(parent, args, ctx, info) {
    //   first take a copy of the updates
    const id = { id: args.id };

    // const item = await ctx.query.item({ id }, `{id title}`);
    return ctx.db.mutation.deleteItem(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async signup(parent, args, ctx, info) {
    //  formats email to lowercase
    args.email = args.email.toLowerCase();
    // hash user password
    const password = await bcrypt.hash(args.password, 10);
    // create user

    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] },
        },
      },
      info
    );
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.APP_SECRET
    );
    // console.log(token);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
      path: "/",
    });
    return user;
  },
  async signin(parent, {email, password}, ctx, info) {
    //  formats email to lowercase
    // check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email ${email}`)
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password')
    }
      // genertae token 
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.APP_SECRET
    );
    // set the cookies with the token
     ctx.response.cookie("token", token, {
       httpOnly: true,
       maxAge: 1000 * 60 * 60 * 24 * 365,
       path: "/",
     }); 
   
    return user;
  },
  
};

module.exports = mutations;
