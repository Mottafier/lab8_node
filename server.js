const http = require('http');
const fs = require('fs');

const port = 1177;

http.createServer((req,res) =>{

    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch(path){
        case '/contact': serveStaticFile(res,"contact.html","text/html") ;break;
        case '/': 
        case '/index': serveStaticFile(res,"index.html","text/html") ;break;
        case '/posts': serveStaticFile(res,"posts.html","text/html") ;break;
        case '/under-construction': serveStaticFile(res,"index.html","text/html") ;break;
        case '/css/style.css': serveStaticFile(res,"css/style.css","text/css") ;break;
        default: 
            if(path.substring(1,7) === "images"){
                serveStaticFile(res,"images/" + path.substring(7),"images/" + path.substring(path.indexOf(".")+1))
            }
            else serveStaticFile(res,"404.html","text/html") ;break;
    }


}).listen(port);

console.log("Server listening on port " + port);

function serveStaticFile(res,path,contentType,responseCode){
    if(!responseCode) responseCode = 200;

    fs.readFile("public/" + path, (err,data) =>{
        if(err){
            res.writeHead(500,{'Content-Type': 'text/plain'})
            res.end("500 - Internal Server Error.")
        }
        else{
            res.writeHead(responseCode,{'Content-Type': contentType});
            res.end(data);
        }
    })
}