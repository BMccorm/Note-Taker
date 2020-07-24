var db = require("../db/db.json");
const fs = require("fs");

module.exports = function (app) {
  //   * GET`/api/notes` - Should read the`db.json` file and return all saved notes as JSON.

  app.get("/api/notes", function (req, res) {
    //console.log(JSON.stringify(db));
    res.json(db);
  });
  //   * POST`/api/notes` - Should receive a new note to save on the request body, add it to the`db.json` file, and then return the new note to the client.
  app.post("/api/notes", function (req, res) {
    //req.body added into db.json
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
    //res.json(db);
  });

  //  * DELETE`/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.This means you'll need to find a way to give each note a unique `id` when it's saved.In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

  // app.post("/api/tables", function (req, res) {
  //   if (tableData.length < 5) {
  //     tableData.push(req.body);
  //     res.json(true);
  //   } else {
  //     waitListData.push(req.body);
  //     res.json(false);
  //   }
  // });

  // app.post("/api/clear", function () {
  //   // Empty out the arrays of data
  //   tableData = [];
  //   waitListData = [];

  //   console.log(tableData);
  // });
};
