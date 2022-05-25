const express = require('express')

const fs = require('fs')
const bodyParser = require('body-parser')
const { json } = require('express/lib/response')

const app = express()

// app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended : true}))

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/form.html')
})

app.post('/form', (req,res) => {


    var userid = req.body.userid
    var username = req.body.username
    var dob = req.body.dob
    var profession = req.body.profession

    var obj = {}

    var new_user = {
        "name" : username,
        "dob" : dob,
        "profession" : profession
    }

    obj[userid] = new_user

    fs.readFile('users.json', "utf-8" , (err,data) => {
        if (err) throw err
        var data = JSON.parse(data)
        data[userid] = obj[userid]
        console.log(data)
        
        var updateuser = JSON.stringify(data)   
        
        
        fs.writeFile('users.json', updateuser, (err) => {
            if (err) throw err
            res.end(updateuser)
        })
    })

    
})



app.post('/getUser', (req,res) => {

    fs.readFile('users.json', "utf-8", (err,data) => {
        var data = JSON.parse(data)

        var ans = data[req.body.useid]
        res.end( JSON.stringify(ans))

    })

})

app.post('/deleteUser', (req,res) =>{ 
    var usid = req.body.usid
    fs.readFile('users.json', "utf-8", (err,data) =>{

        if (err) throw err
        var data = JSON.parse(data)
        delete data[usid]
        var updated = JSON.stringify(data)

        fs.writeFile('users.json', updated, (err) => {
            if (err) throw err
            res.end(updated)
        })

    })
})


app.post('/getAllUser', (req,res) => {
    fs.readFile('users.json' , "utf-8" , (err,data) => {
        res.end(data)
    })
})


app.listen(3000, err => {
    if (err) throw err
    console.log('server is running on the port no : 3000')
})

