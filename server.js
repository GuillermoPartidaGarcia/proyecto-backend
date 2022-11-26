require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const express=require('express');
const cors=require('cors');
const authMiddleware = require('./middleware/auth.middleware');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/routes'));

// moverlo del lado del cliente
app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT ?? 8081;
app.listen(port, ()=>{
    console.log(`Listening in port ${port}`);
});
