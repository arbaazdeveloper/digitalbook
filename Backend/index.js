const connectToMongo=require('./db')
const express = require('express')
const cors = require("cors")
const app = express()
connectToMongo();

app.use(cors())

const port = 5000

app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

//app.get('/', (req, res) => { res.send('Hello my first')})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})