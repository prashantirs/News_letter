const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

    var emailId=req.body.email;
    var fName=req.body.firstName;
    var lName =req.body.secondName;

    var data={
        members:[
            {
                email_address:emailId,
                status:"subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName,
                }
            }
        ]
    };

    var jsonData=JSON.stringify(data);

    var option={
        url:"https://us6.api.mailchimp.com/3.0/lists/d7b3114434",
        method:"POST",
         headers:{
             "Authorization": "prashant 692df2dbcfb14cf29550b7f4d278bf58-us6"
         },
         body:jsonData
    };
  request(option,function(error,response,body){
    if(error){
        res.sendFile(__dirname+"/failure.html");
    }
   
    else{
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
         } 
         else{
            res.sendFile(__dirname+"/failure.html");
         }
    }
   
  });

});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is Running");
})


//API Key
// 692df2dbcfb14cf29550b7f4d278bf58-us6

//List Id
//d7b3114434 