const express = require('express');
const app = express();
const cors = require('cors');

const notesRoutes = require('./src/routes/notesRoutes');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
const dns = require('dns');


// set custom DNS servers to resolve domain names

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors(
    {
        origin : [
            "http://localhost:5173",
            "http://localhost:5174",
        ]
    }
    //origin is a property which tell us that our backend can connect to which which frontend in the form of * 
    //* means hamara backaend ka server koi bhi frontend ke server se baat kar sakta hai
    //if we want our backend to talk with a particular frontend only make array and store those all frontend url which u want to connect with in it
));
app.use('/api/notes',notesRoutes);


app.listen(5000,()=>{
    console.log('Server started on port 5000')
})