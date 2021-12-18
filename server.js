// server.js

// init project
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, Model, DataTypes } = require("sequelize");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
const dbFile = "./.data/sqlite266.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);
const sequelize = new Sequelize("sqlite::memory:");

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

class Category extends Model {}
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    description: DataTypes.TEXT
  },
  { sequelize, modelName: "category" }
);

(async () => {
  await sequelize.sync();
  
  try {
    const ticket = await Category.build({
      id: 'None',
      description: "0 Stars"
    });
    console.log(ticket.toJSON());
    await ticket.save();
    console.log("Ticket was saved to the database!");
  } catch (err) {
    console.log(err);
  }
  
  try {
    const clothing = await Category.build({
      id: 'Few',
      description: "1 Star"
    });
    console.log(clothing.toJSON());
    await clothing.save();
    console.log("Clothing was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const furniture = await Category.build({
      id: 'Average',
      description: "2 Stars"
    });
    console.log(furniture.toJSON());
    await furniture.save();
    console.log("furniture was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const dorm_buys = await Category.build({
      id: 'Slightly More than Average',
      description: "3 Stars"
    });
    console.log(dorm_buys.toJSON());
    await dorm_buys.save();
    console.log("Dorm Buy was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const electronics = await Category.build({
      id: "More than Average",
      description: "Many"
    });
    console.log(electronics.toJSON());
    await electronics.save();
    console.log("Electronic was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const textbooks = await Category.build({
      id: 'Many',
      description: "5 Stars!"
    });
    console.log(textbooks.toJSON());
    await textbooks.save();
    console.log("Textbook was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
})();

////Testing

class Category2 extends Model {}
Category2.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    description: DataTypes.TEXT
  },
  { sequelize, modelName: "category2" }
);

(async () => {
  await sequelize.sync();
  
  try {
    const ticket = await Category2.build({
      id: 'Quiet',
      description: "0 Stars"
    });
    console.log(ticket.toJSON());
    await ticket.save();
    console.log("Ticket was saved to the database!");
  } catch (err) {
    console.log(err);
  }
  
  try {
    const clothing = await Category2.build({
      id: 'Mildly Quiet',
      description: "1 Star"
    });
    console.log(clothing.toJSON());
    await clothing.save();
    console.log("Clothing was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const furniture = await Category2.build({
      id: 'Average',
      description: "2 Stars"
    });
    console.log(furniture.toJSON());
    await furniture.save();
    console.log("furniture was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const dorm_buys = await Category2.build({
      id: 'Slightly More than Average',
      description: "3 Stars"
    });
    console.log(dorm_buys.toJSON());
    await dorm_buys.save();
    console.log("Dorm Buy was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const electronics = await Category2.build({
      id: "More than Average",
      description: "4 Stars"
    });
    console.log(electronics.toJSON());
    await electronics.save();
    console.log("Electronic was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
  try {
    const textbooks = await Category2.build({
      id: 'Many',
      description: "5 Stars!"
    });
    console.log(textbooks.toJSON());
    await textbooks.save();
    console.log("Textbook was saved to the database!");
  }
  catch (err) {
    console.log(err);
  }
  
})();
/////Testing


sequelize.sync();

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!exists) {
    db.run(
      "CREATE TABLE Roommates (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, category int(22), category2 int(22), contact TEXT, datejoined TEXT)"
    );
    console.log("New table Roommates created");
  } else {
    console.log('Database "Roommates" ready to go!');
    //
    db.run(`PRAGMA read_uncommitted = 0`);
    // start indexes
    db.run(`CREATE INDEX IF NOT EXISTS ind_one ON Roommates(id)`);
    // end indexes
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// endpoint to get all the user in the database
app.get("/getRoommates", (request, response) => {
  db.all("SELECT id, title, description, category, category2, contact, datejoined from Roommates", (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

// endpoint to add a user to the database
app.post("/addRoommate", (request, response) => {
  console.log(`add to roommates table ${request.body.item}`);
  if (!process.env.DISALLOW_WRITE) {
    const cleansedtitle = cleanseString(request.body.title);
    const cleanseddescription = cleanseString(request.body.description);
    const cleansedcontact = cleanseString(request.body.contact);
    const cleansedcategory = cleanseString(request.body.category);
    const cleansedcategory2 = cleanseString(request.body.category2);
    const cleanseddate = cleanseString(request.body.date);
    db.run(`BEGIN TRANSACTION EXCLUSIVE;`);
    db.run(
      `INSERT INTO Roommates (title, description, category, category2, contact, datejoined) VALUES (?,?,?,?,?,?)`,
      cleansedtitle,
      cleanseddescription,
      cleansedcategory,
      cleansedcategory2,
      cleansedcontact,
      cleanseddate,
      error => {
        if (error) {
          response.send({ message: "error!" });
        } else {
          response.send({ message: "success" });
        }
      }
    );
    db.run(`COMMIT;`);
  }
});

/////////

/////////

// helper function that prevents html/css/script malice
const cleanseString = function(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// listen for requests
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
