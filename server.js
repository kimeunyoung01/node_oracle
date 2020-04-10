var http = require("http");
var express= require("express");
var app = express();
app.use(express.static("public"));
app.use(express.bodyParser());
app.use(app.router);

app.get("/editDept", function(req, res){
  var dno = req.param("dno");
  var dname = req.param("dname");
  var dloc = req.param("dloc");

  var sql = "update dept set dname='"+dname+"',dloc='"+dloc+"' where dno="+dno;
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

      console.log(sql);
      const result = await connection.execute(sql);
      connection.commit();
    //  console.log(result);
      console.log(result.rowsAffected);
      res.send("1");
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
});


app.get("/deleteDept", function(req, res){
  var dno = req.param("dno");
  var sql = "delete dept where dno="+dno;
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

      console.log(sql);
      const result = await connection.execute(sql);
      connection.commit();
    //  console.log(result);
      console.log(result.rowsAffected);
      res.send("1");
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
});


app.get("/insertDept", function(req,res){
  var dno = req.param("dno");
  var dname = req.param("dname");
  var dloc = req.param("dloc");

  var sql = "insert into dept values("+dno+", '"+dname+"', '"+dloc+"')";
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

      console.log(sql);
      const result = await connection.execute(sql);
      connection.commit();
    //  console.log(result);
      console.log(result.rowsAffected);
      res.send("1");
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

});

//부서 수정, 삭제기능을 추가 해 봅니다.
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
        `select * from dept order by dno`
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
