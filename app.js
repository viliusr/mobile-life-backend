const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const questions = require('./questions.json')

const config = {
  numberOfQuestions: 2,
  mistakesAllowed: 0,
  allowSkipQuestions: false
}

function getQuestions() {
  return questions.slice()
}

function prepareQuestions() {

  const questions = getQuestions();

  if (config.numberOfQuestions > questions.length) {
    throw 'Issuficient quantity of questions'
  }

  // Pick random questions
  let output = getRandom(questions, config.numberOfQuestions)

  output.forEach(item => {
    // Randomize answers order
    item.answers = getRandom(item.answers)
    delete item.correct
  });

  return output
}

function checkResults(input) {
  let mistakes = 0
  let status = false

  const questions = getQuestions()
  const preparedQuestions = {}

  questions.forEach(question => {
    preparedQuestions[question.id] = question.correct
  })

  if (!config.allowSkipQuestions && Object.keys(input).length !== config.numberOfQuestions) {
    return { status }
  }

  for(let questionId in input){
    if (preparedQuestions[questionId] !== input[questionId]) {
      mistakes++
    }
  }

  if (mistakes <= config.mistakesAllowed) {
    status = true;
  }

  return { status }
}

function getRandom(input, length) {
  let output = []

  if (!length) {
    length = input.length
  }

  for (let i = 0; i < length ; i++) {
    output.push(input.splice(Math.floor(Math.random()*input.length),1)[0])
  }

  return output
}

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/get_questions', (req, res) => res.json(prepareQuestions(3)))
app.post('/get_results', (req, res) => res.json(checkResults(req.body)))

app.listen(3001, function () {
  console.log('Mobile Life app backend is listening on port 3001!')
})