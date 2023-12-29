const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/indexx.html");
   
});

app.post("/",function(req,res){
//   console.log(req.body.cityName);
//    const url=https://api.openweathermap.org/data/2.5/weather?q=agartala&units=metric&appid=d2ab1108ed619c001cdd8248f6fd5f88
    const query = req.body.cityName;
    const apiKey = "d2ab1108ed619c001cdd8248f6fd5f88";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apiKey 
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            // console.log(data);     //this will print data in hexadecimal form
            const weatherData = JSON.parse(data);
            // console.log(weatherData);

            //to print the temperature
            // main.temp  part we can get from the json viewer extension from copy path 
            const temp = weatherData.main.temp;
            const weatherDes = weatherData.weather[0].description;
            // console.log(temp);
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";


            // res.send() can be used only once , use res.write() instead

            res.write("<p> The weather is currently "+weatherDes +"</p>");
            res.write("<h1>The temperature of "+query+" is "+ temp+"degrees celcius</h1>");
            res.write("<img src="+imageURL+">");

            res.send();

        });
    });
    // res.send("Server is up and running. ")
})




app.listen(3000,function(){
    console.log("Server is runnning on port 3000.");
})