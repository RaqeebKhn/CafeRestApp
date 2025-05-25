const express = require("express");
const app = express();
const env = require("dotenv");
const port = process.env.PORT || 5173;

app.get("/", (req,res)=>{
    res.status(200).json({
        message: "Hello from server",
    })
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});