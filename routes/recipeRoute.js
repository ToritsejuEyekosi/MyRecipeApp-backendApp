import express from "express";
import { newRecipe, getAllRecipes, getRecipe, updateRecipe, deleteRecipe } from '../controllers/recipeController.js'
import { admin, prof, verifyToken } from "../middleware/userAuthentication.js";

const router = express.Router()

router.get('/', getAllRecipes)
router.get('/:id',verifyToken,getRecipe)
router.post('/create',verifyToken,prof, newRecipe)
router.put('/update/:id',verifyToken,admin,updateRecipe)
router.put('/delete/:id',verifyToken,admin,deleteRecipe)

export default router;