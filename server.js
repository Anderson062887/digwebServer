const express = require("express");
const cors = require("cors");
const port  = process.env.port || 5000;
// const {data} = require("./data");
const pregunta = require("./Model/PreguntaModel");
// const mongoose = require("mongoose");
const xlsx = require("xlsx")
const fs = require("fs");
const path = require("path")
// const filepath = path.dirname(__filename);
// const jp = path.join(filepath,"exel","batch.csv")
// let workbook = xlsx.readFile(jp);
// const [sheetName] = workbook.SheetNames;
//  const jsSheet = workbook.Sheets[sheetName];
//  const jsonData = xlsx.utils.sheet_to_json(jsSheet)

// const filtersauces =  jsonData.filter(i => i.Category === "SAUCE");

// console.log(filtersauces) 


function Stores(list) {
  let storeObj = {};
   list.forEach(element => {
     let number = element.Restaurant;
     if(!storeObj[number]){
      storeObj[number] = [];
      storeObj[number].push(element) 
       
       }else{
        storeObj[number].push(element) 
       }
       
   });
   return storeObj
}

function Swap(ar,i,j) {
   let temp = ar[i];
   ar[i] = ar[j];
   ar[j] = temp;
   return ar;
}
function Bubble(arr) {
 
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < arr.length; j++) {
      if(arr[j] > arr[j + 1]){
        Swap(arr,j,j + 1);
        
      }
      
    } 
  }
  
  return arr;
}



  // let ordersByRestaurant = Stores(filtersauces);
  // console.log(ordersByRestaurant)

//   let sortedRestaurantOrder = ordersByRestaurant["D009"].sort((a,b)=> a.Items - b.Items)
//  let total = sortedRestaurantOrder.reduce((p,n)=> p += n.Quantity,0);
//    console.log(sortedRestaurantOrder)
//  console.log(Math.round(Math.ceil(total/6)))
// const rest = ["002","003","004"];
// rest.includes("002")?console.log("si"):console.log("no")





//  const [sheetName] = inf.SheetNames;
// const spreadSheet = inf.Sheets[sheetName];
// for (const key in spreadSheet) {
//  console.log(spreadSheet[key].v)

// }
const app = express();
const dbconnect = require("./config/dbconnect")
const userRouter  = require("./routes/UserRoutes");
const walkinRouter = require("./routes/walkinRoutes");
const ordersRouter = require("./routes/orderRoutes");
const itemsRouter = require("./routes/ItemsRoutes");
const inventoryRouter = require("./routes/InvRoutes");

dbconnect();
app.use(cors())   
app.use(express.urlencoded({extended:true}))
app.use(express.json())



app.use("/user",userRouter)
app.use("/walkin/items",walkinRouter)
app.use("/orders",ordersRouter);
app.use("/items",itemsRouter);
app.use("/inventory",inventoryRouter);

app.get("/files",(req,res)=>{
 fs.readdir(path.join(__dirname,"exel"),(er,file)=>{
        if (!er) {
          const [,...rest] = file;
            res.json({files:rest})
        }else{
          res.json({err:"an error ocured in getting files"})
        }
      })
  
})

app.get("/files/:filename",(req,res)=>{
  
  const {filename} = req.params;
 const workbook = xlsx.readFile(path.join(__dirname,"exel",filename));
 const [sheetName] = workbook.SheetNames;
 const sheet = workbook.Sheets[sheetName];
  console.log(sheet)
 const jsonSheet = xlsx.utils.sheet_to_json(sheet)
//  console.log(sheet) 
  res.json(jsonSheet)
})

app.get("/microorganisms/:criteria", async(req,res,next)=>{
  //  const preg = new pregunta({
  //   pregunta:"Tipo de contaminsacion?",
  //   respuesta:[{answer:"fisica",valid:false},{answer:"qumica",valid:true},{answer:"biologica",valid:true}]
    
  //  })
  //  await preg.save()
  const found = await pregunta.find();
   console.log(found)
    setTimeout(()=>res.json(found),3000)
       
})

app.post("/create/batch",(req,res,next)=>{
  console.log(req.body)
    res.json({"data":"resived"})
})



app.listen(port,()=>console.log("server running "))