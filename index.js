const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

const data = require('./website.json')

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { data })
})

app.get('/article', (req, res) => {
    res.render('article')
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))