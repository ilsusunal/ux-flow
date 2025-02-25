class Database {
  constructor(dbName) {
    this.sqlite3 = require("sqlite3").verbose();
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

  addDataToDb(tableName, data) {
    this.db.serialize(() => {
      const stmt = this.db.prepare(`INSERT INTO ${tableName} VALUES (?)`);
      stmt.run(data);
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

var db = new Database("test.db");
db.connectToDb();
db.createTable("ilsu", "(test TEXT)");
db.addDataToDb("ilsu", "testtext");

db.readTable("ilsu");
