const question1 = {
  question: "How much is 2 + 2.5?",
  type: "number",
  input: "input",
  value: 4.5,
  error: 10 // - + error percentage allowed
}

const question2 = {
  question: "What of next numbers is prime?",
  type: "string",
  answers: [
    "9",
    "10",
    "11",
    "12"
  ]
}


const questions = [question1, question2]

const quiz = new quizzify.Quiz(questions);
window.quiz = quiz;
