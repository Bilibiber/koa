const sqlServer = require("mssql");

// database config
const dbConfig = {
  server: "DESKTOP-MI4F2T1",
  database: "KOATesting",
  user: "sa",
  password: "123",
  trustServerCertificate: true
};

sqlServer.on("error", (err) => {
  consol.log(err.message);
});

// test function

async function testDB() {
  try {
    await sqlServer.connect(dbConfig);
    const result = await sqlServer.query("select * from [user]");
    console.dir(result);
  } catch (err) {
    console.dir(err);
  }
}

testDB();
module.exports = sqlServer.connect(dbConfig);
