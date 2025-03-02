import sqlite3 from "sqlite3";

const verboseSqlite3 = sqlite3.verbose();

export default class Database {
  constructor(dbName) {
    // this.sqlite3 = require("sqlite3").verbose();
    // this.dbName = dbName;
    this.sqlite3 = verboseSqlite3;
    this.dbName = dbName;
  }
  connectToDb() {
    this.db = new this.sqlite3.Database(this.dbName);
  }
  createTable(tableName, columns) {
    this.db.serialize(() => {
      this.db.run("CREATE TABLE " + tableName + " " + columns);
    });
  }

  addDataToDb(tableName, name, email) {
    this.db.serialize(() => {
      const stmt = this.db.prepare(
        `INSERT INTO ${tableName} (name, email) VALUES (?, ?)`
      );
      // stmt.run(data);
      stmt.run(name, email, (err) => {
        if (err) {
          console.error("Error inserting data:", err);
        } else {
          console.log("Data inserted successfully");
        }
      });
      stmt.finalize();
    });
  }

  readTable(tableName) {
    this.db.serialize(() => {
      this.db.all(`SELECT * FROM ${tableName}`, (err, item) => {
        console.log(item);
      });
    });
  }
}

// var db = new Database("test.db");
// db.connectToDb();
// db.createTable("ilsu", "(test TEXT)");
// db.addDataToDb("ilsu", "testtext");

// db.readTable("ilsu");
