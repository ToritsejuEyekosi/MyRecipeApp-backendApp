import express from "express";
import { newUser, getAllUsers, getUser, updateUser, deleteUser, loginUser } from "../controllers/signUpController.js";
import { verifyToken } from "../middleware/userAuthentication.js";
const router = express.Router()

router.post('/create', newUser)
router.post('/login',loginUser)
router.get('/', verifyToken, getAllUsers)
router.get('/:id',verifyToken,getUser)
router.put('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)





export default router;