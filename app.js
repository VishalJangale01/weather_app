const express = require("express");
const https = require("https");
const { get } = require("http");
const app = express();
const bodyParser = require("body-parser")

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.use(bodyParser.urlencoded({extended : true}));

app.post("/", function(req, res){
    const apiKey = "ca2e442a790b205fdd2097705f4d6a98"
    const query = req.body.cityName;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/find?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    console.log(url);
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const wheatherData = JSON.parse(data);
            const temp = wheatherData.list[0].main.temp;  
            const feels_like = wheatherData.list[0].main.feels_like;      
            const desc = wheatherData.list[0].weather[0].description;
            const icon = wheatherData.list[0].weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>" + desc + "</h1>");
            res.write("<p>Current temprature is " + temp + " degree celsius but it feels like " + feels_like + " degree celsius.</p>");
            res.write("<img src=" + imageURL + ">");  
            res.send();
        })
    });
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
});