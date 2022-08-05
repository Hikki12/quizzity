import { Quiz } from "../src";


describe("Testing quiz methods", () => {
  const quiz = new Quiz();

  test("Index should be on range 0 < index < quiz.length", () => {
    expect(quiz.index >= 0).toBeTruthy();
    expect(quiz.index <= quiz.length).toBeTruthy();
  })

  test("Index bigger than the quiz length should be fixed to quiz length", () =>{
    quiz.setQuestionIndex(100);
    expect(typeof quiz.index).toBe("number");
    expect(quiz.index).toBe(quiz.length);
  })

  test("Index minor than 0 should be 0", () => {
    quiz.setQuestionIndex(-100);
    expect(typeof quiz.index).toBe("number");
    expect(quiz.index).toBe(0);
  })

  test("Should replace variables on the string", ()=> {
    const variables = {
      temperature: 12.0
    }
    const question = "the value of temperature is ${temperature}";
    const parsed = Quiz.parseTemplate(question, variables);
    expect(typeof parsed).toBe("string");
  });

  test("Should return undefined if there are not variables to replace", ()=> {
    const variables = {
      differentVariableName: 12.0
    }
    const question = "the value of temperature is ${myVariable}";
    const parsed = Quiz.parseTemplate(question, variables);
    expect(typeof parsed).toBe("undefined");
  });

  test("Should not passed the quiz length", () => {
    quiz.nextQuestion();
    expect(quiz.index <= quiz.length - 1).toBeTruthy();
  });

  test("Should not be minor to 0", () => {
    quiz.prevQuestion();
    expect(quiz.index >= 0).toBeTruthy();
  });

  test("Should reset index to 0", () => {
    quiz.resetQuestionIndex()
    expect(quiz.index).toBe(0);
  });

  test("should increase the length", () => {
    const question = {
      question: "This is a test question",
      type: "number",
      answer: 1,
      answers: [1, 2, 3, 4]
    }
    quiz.appendQuestion(question);
    expect(quiz.length > 0).toBeTruthy()
  });

  test("Should return a question object", () => {
    const currentQuestion = quiz.getCurrentQuestion();
    expect(currentQuestion).not.toBeUndefined();
  })

  test("Finds a question index", () => {
    const currentQuestion = quiz.getCurrentQuestion();
    const currentQuestionIndex = quiz.findQuestionIndex(currentQuestion);
    expect(currentQuestionIndex).toBe(0);
  });

  test("Should decreases the quiz length", () => {
    const currentQuestion = quiz.getCurrentQuestion();
    quiz.removeQuestion(currentQuestion);
    expect(quiz.length).toBe(0);
  });
});

describe("Tests for set a single reply", () => {
  const quiz = new Quiz();
  const question = {
    question: "This is a test question",
    type: "number",
    answer: 1,
    answers: [1, 2, 3, 4]
  }

  const questionString = {
    question: "This is a string test question",
    type: "string",
    answer: "a",
    answers: ["w", "x", "c", "a"]
  }

  test("Single numeric reply should be correct", () => {
    let reply = 1;
    quiz.appendQuestion(question);
    quiz.setCurrentReply(reply);
    const questionShadow = quiz.getCurrentQuestionShadow();
    expect(quiz.isCorrect(question, questionShadow)).toBeTruthy();
  });

  test("Single numeric reply should be false", () => {
    let reply = 2;
    quiz.setCurrentReply(reply);
    const questionShadow = quiz.getCurrentQuestionShadow();
    expect(quiz.isCorrect(question, questionShadow)).toBeFalsy();
  });

  test("Single string reply should be true", () => {
    let reply = "a";
    quiz.appendQuestion(questionString);
    quiz.setCurrentReply(reply);
    const questionShadow = quiz.getCurrentQuestionShadow();
    expect(quiz.isCorrect(question, questionShadow)).toBeTruthy();
  });

  test("Single string reply should be false", () => {
    let reply = "x";
    quiz.setCurrentReply(reply);
    const questionShadow = quiz.getCurrentQuestionShadow();
    expect(quiz.isCorrect(question, questionShadow)).toBeFalsy();
  });

});


describe("Tests for set multiples replies", () => {
  const quiz = new Quiz();
  const question = {
    question: "This is a test question",
    type: "number",
    answer: [1, 2],
    answers: [1, 2, 3, 4]
  }

  test("Multiple replies should be correct", () => {
    let reply = [1, 2];
    quiz.appendQuestion(question);
    quiz.setCurrentReply(reply);
    const questionShadow = quiz.getCurrentQuestionShadow();
    expect(quiz.isCorrect(question, questionShadow)).toEqual([true, true]);
  });

})
