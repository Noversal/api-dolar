const express = require('express')
const fs = require('node:fs/promises')
require('./lib/crontab.js')
const cors = require('cors')

const app = express()
const PORT_DEFAULT = 3000
const PORT = process.env.PORT ?? PORT_DEFAULT 

app.use(cors())

app.get('/', (req,res) => {
    res.json({
        endpoint : '/api/v1'
    })
})

app.get('/api/v1',(req,res) => {
    fs.readFile('./db/data.json')
        .then(data => {
        const info = JSON.parse(data)
        res.json(info)
    })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})