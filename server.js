const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const linkRoutes = require('./routes/linkRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/links', linkRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("db connected successfully")).catch((err) => console.log("db is not connected", err));

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log(`Server listening on Port ${PORT}`);
})