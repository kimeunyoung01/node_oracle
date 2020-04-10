var http = require("http");
var express= require("express");
var app = express();
app.use(express.static("public"));
app.use(express.bodyParser());
app.use(app.router);

//부서등록 기능을 추가해 봅니다.
app.get("/listDept", function(req,res){
  const oracledb = require('oracledb');
  oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
  const mypw = "madang"  // set mypw to the hr schema password
  async function run() {
    let connection;
    try {
      connection = await oracledb.getConnection(  {
        user          : "c##madang",
        password      : mypw,
        connectString : "localhost:1521/XE"
      });

      const result = await connection.execute(
        `select * from dept`
      );
    //  console.log(result);
      console.log(result.rows);
      res.send(result.rows);
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  run();
  //res.send("ok");
});

http.createServer(app).listen(52273, function(){
  console.log("서버가 가동되었습니다.");
});
