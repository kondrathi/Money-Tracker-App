const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/MoneyList', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => console.error("Error in connecting to the Database:", err));
db.once('open', () => console.log("Connected to Database"));

app.post("/add", (req, res) => {
    const { category_select, amount_input, info, date_input } = req.body;

    const data = {
        "Category": category_select,
        "Amount": amount_input,
        "Info": info,
        "Date": date_input
    };

    db.collection('expenses').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send(err);
        }
        console.log("Record Inserted Successfully");
        return res.status(200).send("Record Inserted Successfully");
    });
});

const PORT = process.env.PORT || 5000; // Use process.env.PORT if available, otherwise default to port 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
