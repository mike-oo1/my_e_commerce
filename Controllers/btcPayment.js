const deliveryModel = require("../Models/deliverymodel")
const cloudinary=require("cloudinary")
const ProductModel=require("../Models/productModel")

exports.BtcPayment = async(req,res)=>{
    try {
        const{FirstName,LastName,ItemName,HouseAddress,ZipCode,Quantity}=req.body
          const data ={
            FirstName,
            LastName,
            ItemName,
            HouseAddress,
            ZipCode,
            Quantity,
            IdentityCard:req.file.path
        }
        console.log(req.body);
        
        let result = null
        if(req.file){
           result = await cloudinary.uploader.upload(req.file.path);
        //    fs.unlinkSync(req.file.path);
        }
       
        const btcPay = new deliveryModel({
          FirstName,
          LastName,
          ItemName,
          HouseAddress,
          ZipCode,
          Quantity,
          IdentityCard:result?.secure_url ,




        })
      
        console.log(req.file.path)
        if(!FirstName||!LastName||!ItemName||!HouseAddress||!ZipCode||!Quantity){
            return res.status(400).json({
                message:"Field cant be empty"
            })

        }
        await btcPay.save()
        
        const id = req.params.id
        const getId = await ProductModel.findById(id)
        console.log(getId.Price)
        
        if(!id){
            return res.status(404).json({
                message:"wrong id format",
                data: id,
                data: data,
            })
                
        }else{
        // const quantity= await paymentModel.findById(getId)
   
   console.log(typeof(getId.Price),typeof(Quantity))
        const payment =getId.Price*Quantity
        console.log(payment)
        const totalPrice = payment
        if(totalPrice<50){
            res.status (400).json({
                message:`pls your total is  $ ${totalPrice} pls pay with gift instead`
            })
                   
        }else{
            res.status(200).json({
                message:"price calculated",
                data: "$"+totalPrice,
                data2:"click here to view the link"
            })

        }
      
      
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}