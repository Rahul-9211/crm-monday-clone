const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')
const url = require('url');
const mongoose = require('mongoose')
const Tickets = require('./modals/modal.ticket')


const app = express()
app.use(cors())
app.use(express.json())



// Random Number 15 unique ID Generator  --------------------------------->
function uniqueIdGenerator() {
    var seq = (Math.floor(Math.random() * 100) + 100).toString().substring(1);
    const id = Date.now() + seq;
    return id;
  }

// const URL = 'https://c5196c14-7258-436a-9252-5e08ad3fb37c-asia-south1.apps.astra.datastax.com/api/rest/v2/namespaces/tickets/collections/tasks'
// const token = 'AstraCS:FQKssqpDwSykOmcIrUDwGexH:39edf698874acaeb00403ed1aa9e94cfba22ea506891b2103e46ff9200bdc893'

try {
    mongoose.connect('mongodb://localhost:27017/Tickets', { useNewUrlParser: true });
    console.log("mongo connected : ");
  } catch (error) {
    console.log("mongo not connected : ", error);
  }

app.post('/tickets', async (req, res) => {
    const formData = req.body.formData
    // console.log(req.body)
    // const options = {
    //     method: "POST",
    //     headers: {
    //         Accepts: 'application/json',
    //     }
    // }

    try {
        Tickets.create({
            uniqueId : uniqueIdGenerator(),
            category: formData.category,
            title: formData.title,
            owner:formData.owner,
            avatar: formData.avatar,
            status: formData.status,
            priority: formData.priority,
            progress: formData.progress,
            description:
            formData.description,
            timestamp: new Date().toUTCString(),
        })
        // console.log("ticket created")
        res.status(200).json({message: "accepted"})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})

app.get('/tickets', async (req, res)=>{
    try {
        const tickets = await Tickets.find({})
        if(tickets){
            res.status(200).json({
                data : tickets
            })
        }
    } catch (error) {
        
    }
})

app.delete('/tickets/:uniqueId', async (req, res)=>{
    
    //  to get domain from email  ----->
    const Y = "/tickets/";
    const str = req.url;
    const uniqueID = str.slice(str.indexOf(Y) + Y.length);
    // console.log("domain", address);
    // console.log(uniqueID)
    try{
        await Tickets.deleteOne({
            uniqueId : uniqueID
        })
        // console.log("accpeted")
        res.status(200).json({message: "accepted"})
    }
    catch(err){
        console.error(err)
    }
})

app.put('/tickets/:uniqueId' , async (req , res)=>{
    const id = req.params.uniqueId 
    const formData = req.body.data
    // console.log("format" , formData)
    try {
        await Tickets.updateMany({
            uniqueId : id
        } , {
            $set : {
                uniqueId : id,
            category: formData.category,
            title: formData.title,
            owner:formData.owner,
            avatar: formData.avatar,
            status: formData.status,
            priority: formData.priority,
            progress: formData.progress,
            description:
            formData.description,
            timestamp: new Date().toUTCString(),
            }
        })
        // console.log("ticket created")
        res.status(200).json({message: "accepted"})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})

app.get('/tickets/:uniqueId' , async (req , res)=>{
    const id = req.params.uniqueId 
    console.log("id" ,id)
    const data = req.body.data
    try {
        const response = await Tickets.findOne({
            uniqueId : id
        })
        res.status(200).json({data : response})
    } catch (error) {
        
    }
})


app.listen(PORT, () => {
    console.log("server running on Port : " + PORT)
})