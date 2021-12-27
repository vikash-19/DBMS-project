let mysql = require('mysql')
let http = require('http')
let url = require('url')
let fs = require('fs')
let express = require('express')
let app = express()
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

