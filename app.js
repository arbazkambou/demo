const express = require("express");
const app = express();
const https=require("https");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});
app.post("/", function (req, res) {
    const fName=req.body.firstName;
    const lName=req.body.lastName;
    const email=req.body.email;
   const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fName,
                LNAME:lName
            }
        }
    ]
   };   
   const jsonData=JSON.stringify(data);
   const url="https://us14.api.mailchimp.com/3.0/lists/b68a3a4b09";
   const options={
    method:"POST",
    auth:"newsLetter:8b785bd76e52aa1cc0a7f8fd54260828-us14"
   }
  const request=https.request(url,options,function(response){
    if (response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    });
  })
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})





app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000");
});  

// api key: b233643ac51358ba81d5d3fbd48fb569-us14
// lis id: b68a3a4b09