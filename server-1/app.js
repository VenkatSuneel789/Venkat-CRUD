var sql = require('mssql');
var express = require("express");
var bodyParser = require("body-parser");
// var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 7777, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

var config = {
    server: "HDC2-D-6Y9PXH2",
    database: 'TestDB',
    user: 'sqlTest',
    password: 'AUG@2019',
    port: 1433
};


var dbConn = new sql.ConnectionPool(config);

app.get("/api/employee", function(req , res){
    // dbConn.connect().then(function () {
    //     var request = new sql.Request(dbConn);
    //     request.query("select * from Employee").then(function (recordSet) {
    //         res.send(recordSet);
    //         console.log(recordSet);
    //         dbConn.close();
    //     }).catch(function (err) {
    //         console.log(err);
    //         dbConn.close();
    //     });
    // }).catch(function (err) {
    //     console.log(err);
    // });
    var query = "select * from Employees where IsActive = 1";
    executeQuery (res, query);
});

//POST API
app.post("/save/employee", function(req , res){
    var query = "INSERT INTO [Employees] (EmpNo,EmpName,Salary,DeptNo,IsActive) VALUES ('" + req.body.EmpNo + "','" + req.body.EmpName +"','" + req.body.Salary+"','" + req.body.DeptNo +"', 1)"
    executeQuery (res, query);
});

//POST API
app.post("/update/employee", function(req , res){
    var query = "update Employees set EmpNo = '" + req.body.EmpNo + "', EmpName = '" + req.body.EmpName +"', Salary = '" + req.body.Salary+"', DeptNo = '" + req.body.DeptNo +"' where UploadId = '"+ req.body.UploadId + "'";
    executeQuery (res, query);
    console.log('ipdat----', query);
});

app.post("/delete/employee", function(req , res){
    var query ="UPDATE Employees SET IsActive = 0 WHERE UploadId = '"+ req.body.UploadId + "'";
    executeQuery (res, query);
});

var  executeQuery = function(res, query){             
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request.query(query).then(function (recordSet) {
            res.send(recordSet);
            // console.log(recordSet);
            dbConn.close();
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });           
}