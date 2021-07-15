const express = require('express')
const app = express()
const PORT = process.env.PORT || 3005


const data = require('./website.json')

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { data })
})

app.get('/:article', (req, res) => {
    console.log(req.params.article)
    let currentArticle = data.filter(ele => ele.id == req.params.article)
    console.log(currentArticle)
    res.render('article', { article: currentArticle[0], data })
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))