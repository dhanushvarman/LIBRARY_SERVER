const express = require("express")
const cors = require("cors")
const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient
const dotenv = require("dotenv").config()
const URL = process.env.DB;
const app = express();

app.use(cors({
    origin: "*",
}))

app.use(express.json());

//create
app.post("/user", async (req, res) => {

    try {
        //Connect Database
        const connection = await mongoClient.connect(URL)

        //Select Database
        const db = connection.db("User")

        //Select collection & DO operation(CRUD)
        await db.collection("admin").insertOne(req.body)

        //Close connection
        await connection.close()

        res.json({ message: "User Created" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
    
})

//read
app.get("/users", async (req, res) => {

    try {
        //Connect Database
        const connection = await mongoClient.connect(URL)

        //Select Database
        const db = connection.db("User")

        //Select collection & DO operation(CRUD)
        const user = await db.collection("admin").find({}).toArray()

        //Close connection
        await connection.close()

        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
})

app.get("/user/:userId", async (req, res) => {

    try {
        //Connect Database
        const connection = await mongoClient.connect(URL)

        //Select Database
        const db = connection.db("User")

        //Select collection & DO operation(CRUD)
        const user = await db.collection("admin").findOne({ _id: mongodb.ObjectId(req.params.userId) })

        //Close connection
        await connection.close()

        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }

})

//update
app.put("/user/:userId", async (req, res) => {

    try {
        //Connect Database
        const connection = await mongoClient.connect(URL)

        //Select Database
        const db = connection.db("User")

        //Select collection & DO operation(CRUD)

        const user = await db.collection("admin").updateOne({ _id: mongodb.ObjectId(req.params.userId) }, { $set: {name:req.body.name,email:req.body.email,office:req.body.office,state:req.body.state,dob:req.body.dob,phone:req.body.phone,salary:req.body.salary,gender:req.body.gender} })

        //Close connection
        await connection.close()

        res.json(user)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }

})

//delete
app.delete("/user/:userId", async (req, res) => {

    try {
        //Connect Database
        const connection = await mongoClient.connect(URL)

        //Select Database
        const db = connection.db("User")

        //Select collection & DO operation(CRUD)
        const user = await db.collection("admin").deleteOne({ _id: mongodb.ObjectId(req.params.userId) })

        //Close connection
        await connection.close()

        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }

    
})

app.listen(process.env.PORT || 3003)

