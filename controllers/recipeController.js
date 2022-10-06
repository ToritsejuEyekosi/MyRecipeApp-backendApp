import express from "express";
import mongoose from "mongoose";
import { CreateRecipe } from "../models/createRecipeModel.js";
import { User } from "../models/userModel.js";


export const newRecipe = async (req, res) => {
    console.log(req.user)
    try {
        const{image,name,description,ingredients,duration,tags} =req.body
        const newRecipe = await CreateRecipe.create({
            image,
            name,
            description,
            ingredients,
            duration,
            tags
        });


        if(newRecipe){
            res.json({
                image:newRecipe.image,
                name: newRecipe.name,
                description:newRecipe.description,
                ingredients: newRecipe.ingredients,
                duration: newRecipe.duration,
                tags: newRecipe.tags,
                author:req.user.username
            })
            
        }
        
    } catch (error) {
        console.error(error.message);
    }
}
        

export const getAllRecipes = async(req,res) => {
    try { 
        const rcp = await CreateRecipe.find();
        if(rcp){
            res.send(rcp)
        }else{
            res.send("Recipes not Found")
        }
    } catch (error) {
        console.error(error.message)
    }
}

export const getRecipe = async(req,res) => {
    try { 
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.json({
                message: "Recipe not found"
            })
        }
        const id = req.params.id
        const rcp = await CreateRecipe.findById(id);
        if(rcp){
            res.send(rcp)
        }else{
            res.send("Recipe not Found")
        }
        
    } catch (error) {
        console.error(error.message)
    }
}

export const updateRecipe = async(req,res) => {
    try { 
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.json({
                message: "Recipe not found"
            })
        }
        const id = req.params.id
        const rcp = await Organization.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if(rcp){
            res.json({
                message:"Recipe Updated Sucessfully",
//              data:rcp,
            })
        }else{
            res.send("Organization not Found")
        }
        
    } catch (error) {
        console.error(error.message)
    }   
}

export const deleteRecipe = async(req,res) => {
    try { 
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.json({
                message: "Recipe not found"
            })
        }
        const id = req.params.id
        const rcp = await CreateRecipe.findByIdAndDelete(id, req.body, {
            new: true,
            runValidators: true,
        });
        if(rcp){
            res.json({
                message:"Recipe Deleted Sucessfully",
                data:rcp
            })
        }else{
            res.send("Recipe not Found")
        }
        
    } catch (error) {
        console.error(error.message)
    }   
}
//-----------------------------------------------------------------------------------------
// to do author part
/*
export const createRecipe = async (req, res) => {
    console.log(req.user)

    try {

        const {name,ingredents,duration} = req.body;



        const newRecipe = await CreateRecipe.create({
            name,
            ingredents,
            duration,
        });

        if(newRecipe){
            res.json({
                name: newRecipe.name,
                ingredents: newRecipe.ingredents,
                duration: newRecipe.duration,
                author: req.user.username
            })
        }
        
    } catch (error) {
        console.error(error.message);
    }
}
*/