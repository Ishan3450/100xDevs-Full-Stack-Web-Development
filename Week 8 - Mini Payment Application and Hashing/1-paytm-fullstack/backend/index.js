const express = require("express");
const rootRoute = require("./routes/index");
const app = express();
const cors = require("cors");
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRoute);

app.listen(PORT, function() {
    console.log(`Server is listening to port ${PORT}`);
})


