const express = require("express");

const app= express();

const users= require("./MOCK_DATA.json");
const fs= require("fs");
const { connected } = require("process");

const port= 8000;

app.use(express.urlencoded({extended: false})); // plugin or a middleware

//routes

app.get("/api/users", (req,res)=>{

    res.setHeader("X-MyName", "Divyanshu"); //Custom header

   return  res.json(users);
});


app.get("/api/users/:id", (req,res)=>{  //Dynamic Path Parammeters

    const id = Number(req.params.id);
    const user = users.find((user) => user.id===id);
    return res.json(user);

});


app.post("/api/users" , (req,res)=>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.JOB_TITLE)
    {
        return res.status(400).json({"msg": "Rikt Sthaan Bhro!"});
    }
    users.push({...body, id: users.length +1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data)=>{
         
        return res.status(201).json({Status: "Success"});
    });

    //TODO - create the user
    
});

app.patch("/api/users/:id" , (req,res)=>{
   
    //TODO - edit the th user id = id
    return res.json({Status: "pending"});
});

app.delete("/api/users/:id" , (req,res)=>{
   
    //TODO - delete the user id with id
    return res.json({Status: "pending"});
});


app.listen(port, ()=> console.log(`Server Started at port ${port}`));


//middleware runs ov every req,res excess.
// It can---
// 1.Excute any connected
// 2.Make changes to req and res objects.
// 3.End the req-res cycle. 
// 4.Call the next Middleware function in the stack. 

//**********HEADERS***********
//it is a Meta Data (format,to,content_type) that gives extra info about req and res.
//Always append -X in front of custom headers. 

//***********HTTP STATUS CODES***********
// 1xx (Informational): 100 Continue, 101 Switching Protocols, 103 Early Hints.
// 2xx (Success): 200 OK, 201 Created, 202 Accepted, 204 No Content, 206 Partial Content.
// 3xx (Redirection): 301 Moved Permanently, 302 Found, 304 Not Modified, 307 Temporary Redirect, 308 Permanent Redirect.
// 4xx (Client Errors): 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 408 Request Timeout, 409 Conflict, 410 Gone, 418 I'm a Teapot, 429 Too Many Requests.
// 5xx (Server Errors): 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.