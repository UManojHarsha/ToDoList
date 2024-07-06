import express, { json } from "express" ;
import pg from "pg" ;
import bodyParser from "body-parser" ;
import cors from "cors" ;

const port = 5000 ;
const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;

const db = new pg.Client({
    user: "postgres" ,
    host: "localhost",
    database: "toDoList",
    password: "manoj789",
    port: 5432 ,
});
  
  db.connect() ;
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*------------------------------CREATING ROUTES------------------------------------------>*/

/*1)For adding a user*/
app.post("/addUser", async(req , res)=>{
    const {username , password} = req.body ;
    if(!username || !password){
        return res.status(400).send("Enter the credentials to register") ;
    }
    try{
        const data = await db.query("SELECT user_name, password from user_data where user_name = $1 and password = $2",[username , password]) ;
        if(data.rows.length > 0){
            return res.status(409).send("User with the entered credentials is already registered, try logging in") ;
        }
        else{
            const result = await db.query("INSERT INTO user_data(user_name , password) VALUES ($1 , $2) RETURNING *" , [username , password]) ;
            if(result.rows.length == 1)res.status(200).send({id : result.rows[0].user_id}) ;
            else res.status(500).send("Error adding user");
        }
    }
    catch(error){
       console.error("Error executing query", error);
       res.status(500).send("Server error");
    }
});

/*2)For logging in a user*/
app.post("/loginUser", async(req , res)=>{
    const {username , password} = req.body ;
    try{
        const data = await db.query("SELECT * from user_data where user_name = $1 and password = $2",[username , password]) ;
        if(data.rows.length > 0){
            console.log(data.rows.length) ;
            console.log(data.rows[0].user_name) ;
            console.log(data.rows[0].password) ;
            console.log(data.rows[0].user_id) ;
            return res.status(200).send({id : data.rows[0].user_id}) ;
        }
        else{
            return res.status(401).send("Invalid username or password") ;
        }
    }
    catch(error){
       console.error("Error executing query", error);
       res.status(500).send("Server error");
    }
});


/*3)Add a new task (common for all week days)*/
app.post("/addNewTask" , async(req , res)=>{
    const {user_id , task_info , day} = req.body ;
    try{
        const table_name = day+"_tasks" ;
        console.log("Adding new task in "+table_name+" for "+user_id) ;
        const data = await db.query(`INSERT INTO ${table_name} (user_id , task_description , task_status) VALUES ($1 , $2 , $3) RETURNING *` , [user_id , task_info , "pending"]) ;
        console.log(data.rows[0].user_id) ;
        return res.status(200).send({result : data}) ;
    }
    catch(error){

    }
});


/*4)For getting sunday tasks*/
app.post("/getSundayTasks", async(req , res)=>{
    const {user_id} = req.body ;
    try{
        console.log("Requesting moday data by "+user_id) ;
        const data = await db.query("SELECT task_description , task_status FROM sunday_tasks where user_id = $1" , [user_id]) ;
        console.log(data.rows.length+" Tasks acquired for " + user_id) ;
        return res.status(200).send({tasks : data}) ;
    }
    catch(error){
       console.error("Error executing query", error);
       return res.status(500).send("Server error");
    }
});

/*5)For getting monday tasks*/
app.post("/getMondayTasks", async(req , res)=>{
    const {user_id} = req.body ;
    try{
        console.log("Requesting moday data by "+user_id) ;
        const data = await db.query("SELECT task_description , task_status FROM monday_tasks where user_id = $1" , [user_id]) ;
        console.log(data.rows.length+" Tasks acquired for " + user_id) ;
        return res.status(200).send({tasks : data}) ;
    }
    catch(error){
       console.error("Error executing query", error);
       return res.status(500).send("Server error");
    }
});

/*6)For getting tuesday tasks*/
app.post("/getTuesdayTasks", async(req , res)=>{
    const {user_id} = req.body ;
    try{
        console.log("Requesting moday data by "+user_id) ;
        const data = await db.query("SELECT task_description , task_status FROM tuesday_tasks where user_id = $1" , [user_id]) ;
        console.log(data.rows.length+" Tasks acquired for " + user_id) ;
        return res.status(200).send({tasks : data}) ;
    }
    catch(error){
       console.error("Error executing query", error);
       return res.status(500).send("Server error");
    }
});

/*7)For getting wednesday tasks*/
app.post("/getWednesdayTasks", async(req , res)=>{
    const {user_id} = req.body ;
    try{
        console.log("Requesting moday data by "+user_id) ;
        const data = await db.query("SELECT task_description , task_status FROM wednesday_tasks where user_id = $1" , [user_id]) ;
        console.log(data.rows.length+" Tasks acquired for " + user_id) ;
        return res.status(200).send({tasks : data}) ;
    }
    catch(error){
       console.error("Error executing query", error);
       return res.status(500).send("Server error");
    }
});

/*8)For getting thursday tasks*/
app.post("/getThursdayTasks", async(req , res)=>{
    const {user_id} = req.body ;
    try{
        console.log("Requesting moday data by "+user_id) ;
        const data = await db.query("SELECT task_description , task_status FROM thursday_tasks where user_id = $1" , [user_id]) ;
        console.log(data.rows.length+" Tasks acquired for " + user_id) ;
        return res.status(200).send({tasks : data}) ;
    }
    catch(error){
       console.error("Error executing query", error);
       return res.status(500).send("Server error");
    }
});

/*9)For getting friday tasks*/
app.post("/getFridayTasks", async(req , res)=>{
    const {user_id} = req.body ;
    try{
        console.log("Requesting moday data by "+user_id) ;
        const data = await db.query("SELECT task_description , task_status FROM friday_tasks where user_id = $1" , [user_id]) ;
        console.log(data.rows.length+" Tasks acquired for " + user_id) ;
        return res.status(200).send({tasks : data}) ;
    }
    catch(error){
       console.error("Error executing query", error);
       return res.status(500).send("Server error");
    }
});

/*10)For getting saturday tasks*/
app.post("/getSaturdayTasks", async(req , res)=>{
    const {user_id} = req.body ;
    try{
        console.log("Requesting moday data by "+user_id) ;
        const data = await db.query("SELECT task_description , task_status FROM saturday_tasks where user_id = $1" , [user_id]) ;
        console.log(data.rows.length+" Tasks acquired for " + user_id) ;
        return res.status(200).send({tasks : data}) ;
    }
    catch(error){
       console.error("Error executing query", error);
       return res.status(500).send("Server error");
    }
});



app.get("/" , (req,res)=>{
    res.sendStatus(200) ;
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
