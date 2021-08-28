const Koa = require("koa");
const KoaRouter = require("koa-router");
const KoaJson = require("koa-json");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter();

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false
});

// Index
router.get("/", async (ctx) => {
  await ctx.render("index");
});

// Jason middleware
app.use(KoaJson());
// Router middleware
app.use(router.routes()).use(router.allowedMethods());

//app.use(async (ctx) => (ctx.body = { msg: "我的很大， 你忍一下" }));

app.listen(3000, () => console.log("服务器起飞！"));
