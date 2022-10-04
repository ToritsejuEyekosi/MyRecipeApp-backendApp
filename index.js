import  express  from "express";
import dotenv from 'dotenv';
import recipeRoute from './routes/recipeRoute.js';
import userRoute from './routes/userRoute.js'
import {connectDB} from './config/db.js'

dotenv.config();
connectDB();

const app = express()
const port = process.env.PORT || 14001;

app.use(express.json())


app.get('/', (req, res) => {
    res.send("Hello World,");
});

app.use('/recipe', recipeRoute)
app.use('/user', userRoute)





app.listen(port, ()=>{
    console.log(`My Server is littttttttttttt on port ${port}`)
})