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
  
  const url = "https://us10.api.mailchimp.com/3.0/lists/6ff3510a3f"
  const options={
    method:"POST",
    auth:"ayemohshwe:516266e3b8669994b25cf657e5c9d6a8-us10"
  }
  const request = https.request(url,options,function(response)
    {
      response.on("data", function(data){
          console.log(JSON.parse(data))
      })
    })

  request.write(jsonData)
  request.end()
  console.log(email)
  
})

app.listen(8000,function(){
  console.log("Server is running on port 8000")
})