const Koa = require("koa");
const KoaRouter = require("koa-router");
const KoaJson = require("koa-json");
const bodyParser = require("koa-bodyparser");
const JWT = require("jsonwebtoken");
const sqlServer = require("mssql");
const bcrypt = require("bcrypt");

// process.env will be added late
const saltRounds = 10;

// database config
const dbConfig = {
  server: "DESKTOP-MI4F2T1",
  database: "KOATesting",
  user: "sa",
  password: "123",
  trustServerCertificate: true
};

const app = new Koa();
const router = new KoaRouter();

// bodyParser to see the request body
app.use(bodyParser());
// make your json looks better
app.use(KoaJson());
// config routes
app.use(router.routes()).use(router.allowedMethods());

// Index
router.post("/register", register);

// register using email and password
async function register(ctx) {
  const data = ctx.request.body;
  console.log(ctx.request.body);
  await sqlServer.connect(dbConfig);
  // hash error not handled
  bcrypt.hash(data.password, saltRounds, function (err, hash) {
    try {
      sqlServer.query`Insert into [user](email, hashedPassword, created_time) values (${data.email}, ${hash},${data.create_time})`;
    } catch (err) {
      ctx.response.body = err.message;
    }
  });
  ctx.response.body = "user created";
}

//app.use(async (ctx) => (ctx.body = { msg: "我的很大， 你忍一下" }));

app.listen(3000, () => console.log("服务器起飞！"));
