import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "tajinder",
  host: "localhost",
  database: "Permalist",
  password: "kawal9646",
  port: 5432
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

// let items = await db.query("SELECT * FROM todo");
// items = items.rows;
// console.log(items);

app.get("/", async (req, res) => {
  let items = await db.query("SELECT * FROM todo ORDER BY id ASC");
    items = items.rows;
    console.log(items);
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO todo (title) VALUES ($1)",[item])
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
  // items.push({ title: item });
  
});

app.post("/edit", async (req, res) => {
  let ID= req.body.updatedItemId;
  let Title=req.body.updatedItemTitle;
  try {
    db.query("UPDATE todo SET title = $1 WHERE id = $2 ",[Title,ID]);
    res.redirect("/");
    
  } catch (error) {
    console.log(error);
  }

});

app.post("/delete", async (req, res) => {
  let id=req.body.deleteItemId;
  await db.query("DELETE FROM todo WHERE id =$1",[id]);
  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
