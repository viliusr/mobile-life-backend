const express = require('express')
const bodyParser = require('body-parser')
const qc = require('./controllers/QuestionsCtrl.js')

const QuestionsCtrl = new qc()
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/get_questions', (req, res) => res.json(QuestionsCtrl.prepareQuestions()))
app.post('/get_results', (req, res) => res.json(QuestionsCtrl.checkResults(req.body)))

app.listen(3001, function () {
  console.log('Mobile Life app backend is listening on port 3001!')
})