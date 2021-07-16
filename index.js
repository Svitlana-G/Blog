const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3060

const data = require('./website.json')

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', { data, menu: "All" })
})

app.post('/add', (req, res) => {
    // console.log(req)
    console.log(req.body)
    idCurrent = data.length
    data.push({
        id: idCurrent,
        url: req.body.url,
        title: req.body.myTitle,
        body: req.body.body,
        author: req.body.author,
        author_bild: req.body.author_bild
    })
    // console.log(data)
    fs.writeFile('./website.json', JSON.stringify(data), 'utf-8', (err) => {
        if (err) throw err
    })
    res.redirect('/newArticle')
})


app.get('/newArticle', (req, res) => {
    res.render('newArticle', { data, menu: "All" })
})


app.get('/article/:article', (req, res) => {
    console.log(req.params.article)
    let currentArticle = data.filter(ele => ele.id == req.params.article)
    console.log(currentArticle)
    res.render('article', { article: currentArticle[0], data, menu: "Blog" })

})



app.listen(PORT, () => console.log(`http://localhost:${PORT}`))