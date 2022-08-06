import { DB } from "https://deno.land/x/sqlite@v3.4.0/mod.ts";

const db = new DB(":memory");
db.query(
  "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)",
);
db.query("INSERT INTO users (name, age) VALUES (?, ?)", ["hoge", 20]);
db.query("INSERT INTO users (name, age) VALUES (?, ?)", ["piyo", 30]);
for (const [name, age] of db.query("SELECT name, age FROM users")) {
  console.log(name, age);
}
db.close();
