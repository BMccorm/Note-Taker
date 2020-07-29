var db = require("../db/db.json");
const fs = require("fs");
//import { v4 as uuidv4 } from "uuid";
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
  //   * GET`/api/notes` - Should read the`db.json` file and return all saved notes as JSON.

  app.get("/api/notes", function (req, res) {
    res.json(db);
  });

  //   * POST`/api/notes` - Should receive a new note to save on the request body, add it to the`db.json` file, and then return the new note to the client.
  app.post("/api/notes", function (req, res) {
    //req.body added into db.json
    req.body.id = uuidv4();

    db.push(req.body);
    console.log(db);

    fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
      if (err) {
        throw err;
      }
      console.log("good!");
    });

    //write the file
    //return out req.body
    res.json(db);
  });

  //  receive a query parameter containing the id of a note to delete. give each note a unique `id` when it's saved.
  app.delete("/api/notes/:id", function (req, res) {
    //1. find the index location of the array
    console.log(req.params.id);
    for (var i = 0; i < db.length; i++) {
      if (req.params.id == db[i].id) {
        //2. use splice and remove off one item
        //    .splice(location,1)
        console.log(i);
        console.log("found");
        db.splice(i, 1);
        fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
          if (err) {
            throw err;
          }
          console.log("good!");
          res.json(db);
        });
      }
    }
  });
};
