const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const advertiser = require('./routes/advertiser')
const apartment = require('./routes/apartment')
const category = require('./routes/category')
const user = require('./routes/user')
const city = require('./routes/city')

const connectDB = require('./connectToDB')

const app = express()
app.use(express.json())


// const cors = require('cors');
// app.use(cors());


app.use(bodyParser.json());

dotenv.config();

connectDB()


// Connection parameters for mongoose
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};


app.get('', (req, res) => {
    res.status(200).send('🐏〰🐏')
})

app.use('/advertiser', advertiser)
app.use('/apartment', apartment)
app.use('/category', category)
app.use('/user', user)
app.use('/city', city)

app.listen(3001, () => {
    console.log(`my app is listening in http://localhost:3001`);
})