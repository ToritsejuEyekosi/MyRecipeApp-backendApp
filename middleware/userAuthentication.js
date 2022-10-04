import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

 


export const verifyToken = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        //console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        console.error(error);
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error(`Not Authorized`);
    }
  };


  export const admin = async (req, res, next) => {
    if  (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error('Not Authorized');
    }
}

  export const prof = async(req,res,next)=>{
    if(req.user && req.user.Membership === "professional"){
      next()
    }else{
      res.status(401)
      throw new Error('Not Authorized')
    }
  }