import express from "express";
import authenticateJwt from "../auth/authenticateJwt";
import ORDER from "../models/order";
const router=express.Router();


router.post("/order",authenticateJwt,async(req,res)=>{
       
    const {user,order,date}=req.body;
    
    const userExist=await ORDER.findOne({user:user});

    if(!userExist){
        
    }


})

