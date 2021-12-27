let mysql = require('mysql')
let http = require('http')
let url = require('url')
let fs = require('fs')
let express = require('express')
let app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
let path = require('path')
let con = mysql.createConnection({
    user: 'root',
    password: '#WorkHard',
    hostname: '0.0.0.0',
    database: 'RRS'
})
app.use(express.static(path.join(__dirname,'public')))
con.connect((err, acc) => {
    if (err)
        throw err;
    else
        app.listen(3000)
})

app.all("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err)
            console.log("something went wrong")
    })
})

app.all('/submit', (req, res) => {
    con.query("select * from worker", (err, data, attrib) => {
        let fields = []

        for (let obj of attrib) {
            fields.push(obj.name)
        }
        console.log(fields)
    })
})

app.all("/PNRSearch",(req,res)=>{
    try{
    let query= url.parse(req.url).query
    let nw ={}
    let qu=`select passenger_name as Name,  coach , berth_no ,starting_st as 'FROM' ,ending_st as 'TO' from cnf_res where `
    for(let i of query.split('&')){
    qu=qu+" "+ i;
    }
    
    qu=decodeURIComponent(qu)
    // console.log(qu)
    con.query(qu,(err,data)=>{
        if(err)
        console.log("something is wrong!")
        else
        res.json(data)
    })
    }
    catch{
     res.status=404;
     res.send('')
    }
});
function getRand(){
    return ( Math.floor(Math.random()*500))
}
let coach=['S1' , 'S2' , 'S3' , 'S4']
app.all("/enquiryTrain",(req,res)=>{
    try{
    let query= url.parse(req.url).query
    let nw ={}
    
    
    query=decodeURIComponent(query)
    let lst=[]
    for(let i of query.split('&')){
        let [a,b]=i.split('=')
        lst.push(b)
        }

        let qu=` select distinct tinfo1.Train_no as 'Train No' , train_name from trains, traininfo as tinfo1,traininfo as tinfo2 
        where tinfo1.Station_code = ${lst[0]} and tinfo2.Station_code = ${lst[1]} and tinfo1.train_no = trains.train_no and tinfo1.Distance_travelled < tinfo2.Distance_travelled
        and tinfo1.train_no = tinfo2.train_no`
        // console.log(qu)
        con.query(qu,(err,data)=>{
        if(err)
        console.log("something is wrong!")
        else
        res.json(data)
    })
    }
    catch{
     res.status=404;
     res.send('')
    }
});

app.all("/Train_search.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'Train_search.html'))
})

app.all("/Book.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'Book.html'))
})

app.all("/PNR_search.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'PNR_search.html'))
})

app.all("/cancellation.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'cancellation.html'))
})

app.post("/book" , function(req, res){
    let data=req.body; 
    // console.log(req.body);
    con.query("select * from pnr_stump",(err,dt)=>{
        if(err) throw err ;
        let temp=dt ;
        let curPnr =  temp[0].pnr+1;
        con.query('truncate table pnr_stump',()=>{})
        con.query('insert into pnr_stump values('+curPnr+')',()=>{})

        console.log(curPnr);

        function ins(curPnr, obj){
            let query=`insert into cnf_res values ( ${curPnr} , '${coach[getRand()%4]}' , ${getRand()%80} , '${obj.name}' , ${obj.age} , '${obj.gender}',${data.train_no} , '${data.starting_st}' , '${data.ending_st}' , 'GN' , '1234567890' , '${data.pin_code}' , '${new Date().getDate()}')`
            console.log(query);
            con.query(query,(err,data)=>{
                if(err) console.log("something went wrong") ;
                else    console.log(curPnr);
            })
        }

        if(data.name1.length > 0){
            ins(curPnr , {name : data.name1 ,age : data.age1 , gender : data.Gender1});
        }

        if(data.name2.length > 0){
            ins(curPnr , {name : data.name2 ,age : data.age2 , gender : data.Gender2});
        }
        if(data.name3.length > 0){
            ins(curPnr , {name : data.name3 ,age : data.age3 , gender : data.Gender3});
        }
        if(data.name4.length > 0){
            ins(curPnr , {name : data.name4 ,age : data.age4 , gender : data.Gender4});
        }

        let html=`<p style='margin:auto; background-color:blue;font-size:3em;'>SuccessFull!
                Your PNR number is ${curPnr}<p>
                  <button onclick='window.location="/"'> go to home page</button>`
        res.send(html)
    })
})