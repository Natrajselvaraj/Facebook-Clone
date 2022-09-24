const exp = require("express");
const mycon = require("mysql");
var bodyparser = require("body-parser");
const cors = require("cors");
var multer = require("multer");
var upload = multer();

const app = exp();
app.use(cors());
app.use(exp.json());
app.use(upload.array());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(exp.static('public'));

const c=mycon.createConnection({
    host:"localhost",
    user:"root",
    password:"3306",
    database:"facebook"
});

c.connect(function(err)
{
    if(err){console.log(err);}
    else{console.log("Database Connected");}
});

app.post('/signup',(req,res)=>{
    let firstname=req.body.firstname;
    let surname=req.body.surname;
    let email=req.body.email;
    let password=req.body.password;
    let date=req.body.date;
    let gender=req.body.gender;

    let sql='insert into signup(firstname,surname,email,password,date,gender,status)values(?,?,?,?,?,?,?)';

    c.query(sql,[firstname,surname,email,password,date,gender,0],(err,result)=>
    {
        if (err)
        {
            let s={"status":'error'};
            res.send(s);
        }
        else
        {
            let s={"status":"Successfully Created login id"};
            res.send(s);
        }
    });
});

    app.post('/',(req,res)=>{
        let email = req.body.email;
        let password = req.body.password;

        let sql = 'select * from signup where email=?';

        c.query(sql,[email],(err,result)=>{
            if(result.length > 0)
            {
                let email = result[0].email;
                let password = result[0].password;
                let id = result[0].id;
                if(email1 == email && password1 == password)
                {
                    let s ={status:id};
                    res.send(s);
                }
                else
                {
                    let s = { status:"error"};
                    res.send(s);
                }
            }
            else
            {
                let s = {"status":"error"};
                res.send(s);
            }
        })
    });
     app.post('/getuserdetails',(req,res)=>{
        let id = req.body.id;
        let sql = 'select * from signup where id=?';
        c.query(sql,[id],(error,result)=>{
            res.send(result);
        })
     });
     app.listen(3004);