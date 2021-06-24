// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  app.get("/api/items", function(req, res) {
    var dbQuery = "SELECT * FROM inventory.Items";
    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get("/api/items/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Item.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  

  app.post("/api/items", function(req, res) {
    console.log("New Item Data");
    console.log(req.body);

    var dbQuery =
      "INSERT INTO inventory.Items (id,itemName,category,link,quantity,priceHist1,priceHist2,priceHist3,priceHist4,priceHist5,priceHist6,imgPath,modifiedBy,createdAt,updatedAt) VALUES ?";

    connection.query(
      dbQuery,
      [
        req.body.itemName,
        req.body.category,
        req.body.link,
        req.body.quantity,
        req.body.priceHist1,
        req.body.priceHist2,
        req.body.priceHist3,
        req.body.priceHist4,
        req.body.priceHist5,
        req.body.priceHist6,
        req.body.imgPath,
        req.body.modifiedBy,
        req.body.createdAt,
        req.body.updatedAt
      ],
      function(err, result) {
        if (err) throw err;
        console.log("successfully posted");
        res.end();
      }
    );
  });

  
};
