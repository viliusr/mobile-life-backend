class QuestionsCtrl {

  constructor(config, questions) {
    this.config = config
    this.questions = questions
  }

  getQuestions() {
    return JSON.parse(JSON.stringify(this.questions))
  }

  prepareQuestions() {

    const questions = this.getQuestions()

    if (this.config.numberOfQuestions > questions.length) {
      throw 'Issuficient quantity of questions'
    }

    // Pick random questions
    let output = this.getRandom(questions, this.config.numberOfQuestions)

    output.forEach(item => {
      // Randomize answers order
      item.answers = this.getRandom(item.answers)
      delete item.correct
    })

    return output
  }

  checkResults(input) {
    let mistakes = 0
    let status = false

    const questions = this.getQuestions()
    const preparedQuestions = {}

    questions.forEach(question => {
      preparedQuestions[question.id] = question.correct
    })

    if (!this.config.allowSkipQuestions && Object.keys(input).length !== this.config.numberOfQuestions) {
      return { status }
    }

    for(let questionId in input){
      if (preparedQuestions[questionId] !== input[questionId]) {
        mistakes++
      }
    }

    if (mistakes <= this.config.mistakesAllowed) {
      status = true
    }

    return { status }
  }

  getRandom(input, length) {
    let output = []

    if (!length) {
      length = input.length
    }

    for (let i = 0; i < length ; i++) {
      output.push(input.splice(Math.floor(Math.random()*input.length),1)[0])
    }

    return output
  }

}

module.exports = QuestionsCtrl