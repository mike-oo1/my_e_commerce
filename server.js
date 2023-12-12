const express =require("express")
const mongoose =require("mongoose")
const dotenv =require("dotenv")
dotenv.configDotenv({path:"./Config/config.env"})

const cors=require("cors")
require ("dotenv").config()



const route=require("./Router/productsRouter")
const router=require("./Router/userRouter")
const debitCardRoute =require("./Router/paymentRoutes")


const app = express()
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ["GET"]
}))
app.use("/Uploads", express.static(__dirname + "/Uploads"))


app.use("/api",route)
app.use("/api",router)
app.use("/api",debitCardRoute)
const port = process.env.PORT
const DB = process.env.DATABASE
console.log(DB)
mongoose
.connect(DB,{
   useUnifiedTopology:true,
   useNewUrlParser:true
})

.then(()=>{
    console.log("database connected successfully")
}).catch((error)=>{
    console.log(error.message)
})
app.listen(process.env.port||2345,()=>{
    console.log(`server is listening to port ${port}`)
})
