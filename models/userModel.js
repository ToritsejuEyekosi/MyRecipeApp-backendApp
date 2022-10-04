// This is the schema
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

 const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: [{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    }],
    password: {
        type: String,
        required: true,
    },
    Membership: {
        type: String,
    enum: ['regular', 'professional'],
    default: 'regular'
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
}
 )
// userSchema.methods.toJSON = function(){
//     const user = this
//     const userObject = user.toObject();
//     delete userObject.password
//}
// hash password
userSchema.pre('save', async function(next){
const user = this
if(user.isModified('password')){
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
}
next()
})

userSchema.statics.Login = async function(email,password){
    const user =await this.findOne({email});
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password')
    }else{
        throw Error('Incorrect Email')
       // return 'Incorrect Email'
        }
        
    }

export const User = mongoose.model("User", userSchema ) 