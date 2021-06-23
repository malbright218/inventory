// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");

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
