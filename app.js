var express = require('express');
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
var drive = require('./drive');

//open-api Code Starts
const OPENAI_API_KEY = "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";

const { Configuration, OpenAIApi } = require("openai");
const e = require('express');
const { Script } = require('vm');
const { json } = require('express');
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function call(text,res){
  try{
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      max_tokens: 2048,
      temperature: 0.5,
    });
    return response;
  }catch(e){
    return res.send(e);
  }
    
  }

//open-api ends

app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/', function(req,res){
    res.sendFile( __dirname + "/" + "proj.html" );
});

app.post('/text.html/text', function(req,res){
    var respo;
    console.log(req.body.text_to_gen);
    call(req.body.text_to_gen,res).then(response => {
        const data = fs.readFileSync(path.join(__dirname+'/text.html'),{encoding:'utf8', flag:'r'});
        respo = response.data.choices[0].text.replace(/\s+/g,' ').trim();
        console.log(respo);
        res.send(data + "<script>document.getElementById('ans').innerHTML = " +"'"+respo+"'"+"</script>");
    });
});

app.get('/magazien.html',function(req,res){
  res.sendFile(__dirname + "/project/MOHOGYA.html" )
});

app.get('/text.html', function(req,res){
  res.sendFile(__dirname + '/text.html');
});

app.get('/proj.html', function(req,res){
  res.sendFile(__dirname + '/proj.html');
});
app.post('/project',function(req,res){
  var count = -1;
  drive.searchFile(req.body.ID).then(files=>{
    /*var frames_data = "";
    var count = 1;
    files.forEach((file) => {
      if(file.mimeType == 'text/html'){
        drive.downloadFile(file.id).then(data => {
          frames_data+='<iframe>'+data;
          //frames_data +=data.replace(/\s+/g,' ').trim();
          frames_data+='</iframe>';
          count++;
          if(count == files.length){
            const data = fs.readFileSync(path.join(__dirname+'/gen_layOut.html'),{encoding:'utf8', flag:'r'});
            res.send(frames_data );
          }
        })
      }
    });*/
    const data = fs.readFileSync(path.join(__dirname+'/index.html'),{encoding:'utf8', flag:'r'});
    console.log(files);
    res.send( data + "<Script> var data = "+JSON.stringify(files)+ ";" + "seprate()" + "</Script>");
    //res.send( data + "<Script> var data = "+JSON.stringify(files)+ ";setlayout('" + files[count].id + "');curr =" + count + "</Script>");
  });
});

app.post('/getlayout',function(req,res){
  var id = req.body.id;
  drive.downloadFile(id).then(data =>{
    res.send(data);
  });
})

app.get('/leads', function(req,res){
    drive.searchFiles(id).then(data=> console.log(data[0]));
    res.sendFile( __dirname + "/order_controler.html" );
 });

app.post('/getFiles',function(req,res){
  var id = req.body.id;
  drive.searchFiles(id).then(data =>{
    res.send(data);
  });
})

app.post('/updateHtml',function(req,res){
  var data = req.body.html;
  var id = req.body.id;
  drive.updateFile(id,data).then(respo=>{
    res.send(respo);
  });
})

/*drive.searchFile().then(response => {
  console.log(response);
});*/


app.listen(process.env.PORT || 5000);
