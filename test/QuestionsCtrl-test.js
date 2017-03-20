const chai = require('chai')

const config = {
  numberOfQuestions: 2,
  mistakesAllowed: 0,
  allowSkipQuestions: false
}

const questions = [{ 'id': 1, 
                    'text': 'Q1', 
                    'answers': [
                      { 'id': 1, 'text': 'Q1A1' },
                      { 'id': 2, 'text': 'Q1A2' }
                    ], 
                    'correct': 1 
                  },
                  { 'id': 2, 
                    'text': 'Q2', 
                    'answers': [
                      { 'id': 1, 'text': 'Q2A1' },
                      { 'id': 2, 'text': 'Q2A2' }
                    ], 
                    'correct': 2 
                  },
                  { 'id': 3, 
                    'text': 'Q3', 
                    'answers': [
                      { 'id': 1, 'text': 'Q3A1' },
                      { 'id': 2, 'text': 'Q3A2' }
                    ], 
                    'correct': 2 
                  }]

const qc = require('../controllers/QuestionsCtrl.js')
const QuestionsCtrl = new qc(config, questions)

describe('Questions controller', function() {

  it('method prepareQuestions returns proper quantity of questions', function() {
    chai.expect(QuestionsCtrl.prepareQuestions().length).to.equal(config.numberOfQuestions)
  })

  it('check results with incorrect answers', function() {
    chai.expect(QuestionsCtrl.checkResults({ 1: 2, 2: 1, 2: 2 }).status).to.equal(false)
  })

  it('check results with correct answers', function() {
    chai.expect(QuestionsCtrl.checkResults({ 1: 1, 2: 2, 2: 2 }).status).to.equal(true)
  })

})