import express from "express";  
import cors from "cors";
import Database from "better-sqlite3";
const db = new Database("database.db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", function (request, response) {
    response.json("This is the root");
});

app.get("/guestbook", function (request, response){
    const messageTable = db.prepare("SELECT * FROM messageTable").all();
    response.json(messageTable);
});

app.post("/guestbook", function (request, response){
    console.log(request.body);
    const firstName = request.body.firstName;
    const message = request.body.message;

    const newMessage = db
        .prepare(`INSERT INTO messageTable (firstName, message) VALUES (?, ?)`)
        .run(firstName, message);
    response.json(newMessage);
});

app.listen(8080, function(){
    console.log("It is working");
});

app.delete("/guestbook/:id", function (request, response) {
    const id = request.params.id;
    const deleteMessage = db.prepare("DELETE FROM messageTable WHERE id = ?").run(id);
    response.json({ message: "Deleted successfully", deleteMessage });
});