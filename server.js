const express =require("express")
const bodyParser =require("body-parser")
const https = require("https")

const app = express()
const path = require('path')
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/',(req,res)=>{
  res.sendFile(__dirname + "/index.html")
})

app.post('/',(req,res)=>{
  const email = req.body.email
  const data = {
    members:[{
      email_address:email,
      status: "subscribed",
      
    }]
  }
  var jsonData = JSON.stringify(data)
  
  const url = "https://us12.api.mailchimp.com/3.0/lists/dcbfd5ca97"
  const options={
    method:"POST",
    auth:"ayemohshwe:ce5217e5891fb7d167c0e2cbb06e5197-us12"
  }
  const request = https.request(url,options,function(response)
    {
      response.on("data", function(data){
          console.log(JSON.parse(data))
      })
    })

  request.write(jsonData)
  request.end()
  
})

app.listen(8080,function(){
  console.log("Server is running on port 8080")
})