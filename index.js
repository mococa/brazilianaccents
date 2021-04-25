const express = require('express')
const app = express()
const Datastore = require('nedb')
const db = new Datastore("database.db")
db.loadDatabase()

app.use(express.static('public'))

app.set('views', './public/views')
app.set('view engine', 'ejs')

app.get("/", (req,res)=>{
    db.loadDatabase()
    db.find({}, (er,docs)=>{
        res.render("index", {sotaques:docs})
    })  
})
app.get("/add", (req,res)=>{
    db.loadDatabase()
    db.find({}, (err,docs)=>{
        var found = false
        for(const doc of docs){
            if(Object.keys(doc)[0]==req.query.estado){
                found=true
                db.update({_id:doc._id}, {$push:{[req.query.estado]:req.query.video}}, {}, (err,nou,u)=>{
                        res.send("Pronto")
                   
                })
                break;
            }
        }
        !found?res.send("Não achou"):null;
    })
})
app.listen(3000, ()=>console.log("uhul"))