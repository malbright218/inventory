// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  app.get("/api/endusers", function (req, res) {
    var dbQuery = "SELECT * FROM inventory.EndUsers";
    connection.query(dbQuery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/endusers/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.EndUsers.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (data) {
      res.json(data);
    });
  });

  app.post("/api/endusers", function (req, res) {
    console.log("New End User Data");
    console.log(req.body);

    var dbQuery =
      "INSERT INTO inventory.EndUsers (id,name,title,location,itemHist1,itemHist2,itemHist3,itemHist4,itemHist5,itemHist6,itemHist7,itemHist8,itemHist9,itemHist10,itemHist11,itemHist12,itemHist2Date,itemHist3Date,itemHist4Date,itemHist5Date,itemHist6Date,itemHist7Date,itemHist8Date,itemHist9Date,itemHist10Date,itemHist11Date,itemHist12Date,createdAt) VALUES ?";

    connection.query(
      dbQuery,
      [
        req.body.id,
        req.body.name,
        req.body.title,
        req.body.location,
        req.body.itemHist1,
        req.body.itemHist2,
        req.body.itemHist3,
        req.body.itemHist4,
        req.body.itemHist5,
        req.body.itemHist6,
        req.body.itemHist7,
        req.body.itemHist8,
        req.body.itemHist9,
        req.body.itemHist10,
        req.body.itemHist11,
        req.body.itemHist12,
        req.body.itemQuant1,
        req.body.itemQuant2,
        req.body.itemQuant3,
        req.body.itemQuant4,
        req.body.itemQuant5,
        req.body.itemQuant6,
        req.body.itemQuant7,
        req.body.itemQuant8,
        req.body.itemQuant9,
        req.body.itemQuant10,
        req.body.itemQuant11,
        req.body.itemQuant12,
        req.body.itemHist1Date,
        req.body.itemHist2Date,
        req.body.itemHist3Date,
        req.body.itemHist4Date,
        req.body.itemHist5Date,
        req.body.itemHist6Date,
        req.body.itemHist7Date,
        req.body.itemHist8Date,
        req.body.itemHist9Date,
        req.body.itemHist10Date,
        req.body.itemHist11Date,
        req.body.itemHist12Date,
        req.body.createdAt,
        req.body.updatedAt,
      ],
      function (err, result) {
        if (err) throw err;
        console.log("successfully posted");
        res.end();
      }
    );
  });
};
