import express from "express";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/utility.js";
import mongoose from "mongoose";


export const newUser = async (req, res) => {
    const {username, email,password,Membership} = req.body;

    const userExists = await User.findOne({email});

    if (userExists){
        res.send(400);
        throw new Error(`Message: User Already Exists`)
    }
    const newUser = await User.create({
        username,
        email,
        password,
        Membership
    });
    if(newUser){
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            Membership: newUser.Membership,
            token:generateToken(newUser._id)

        })
    }

}


    
    export const getAllUsers = async(req, res) => {
        try { 
            const allUsers = await User.find();
             res.json(allUsers)
            if(allUsers){
                res.status(200).json({
                    message: "Successful",
                    data: allUsers
                }
                )
           } else{
            res.status(404).json({
                message: "Users Not Found",
            })
           } 
        } catch (error) {
            console.error(error.message)
        }
        
    }
    
    export const getUser = async(req,res) => {
        try { 
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.json({
                    message: "User not found"
                })
            }
            const id = req.params.id
            const sign = await User.findById(id);
            console.log(sign)
            if(sign){
                res.send(sign)
        
            }else{
                res.send("User not Found")
            }
            
        } catch (error) {
            console.error(error.message)
        }
    }
    
    export const updateUser = async(req,res) => {
        try { 
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.json({
                    message: "User not found"
                })
            }
            const id = req.params.id
            const sign = await User.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            if(sign){
                res.json({
                    message:"User Updated Sucessfully",
                data:sign,
                })
            }else{
                res.send("User not Found")
            }
            
        } catch (error) {
            console.error(error.message)
        }   
    }
    
    
     export const deleteUser = async(req,res) => {
        try { 
            if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.json({
                    message: "User not found"
                })
            }
            const id = req.params.id
            const sign = await User.findByIdAndDelete(id);
            if(sign){
                res.json({
                    message:"User Deleted Sucessfully",
                   // data:sign
                })
            }else{
                res.send("User not Found")
            }
            
        } catch (error) {
            console.error(error.message)
        }   
    }
    export const loginUser = async (req, res) => {
        const { email, password } = req.body;
      try{
        const user = await User.Login( email , password);
        const token = await generateToken(user._id)
      
        if (!user) {
          throw new Error("Invalid email or password");
        }
      
        if (user) {
        return res.status(200).send({msg: `${user.username}, you logged in Successfully`, token});
        }
    } catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}
