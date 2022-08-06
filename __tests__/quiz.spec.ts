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


describe("Tests for numeric corrections", () => {
  const quiz = new Quiz();

  test("Reply should be correct", () => {
    const answer = 2.2;
    const reply = 2.2;
    const isCorrect = quiz.isCorrectNumeric(answer, reply, undefined);
    expect(isCorrect).toBeTruthy();
  });

  test("Reply should be false", () => {
    const answer = 2.2;
    const reply = 4;
    const isCorrect = quiz.isCorrectNumeric(answer, reply, undefined);
    expect(isCorrect).toBeFalsy();
  });

  test("Reply with some (+positive) error allowed should be correct", () => {
    const answer = 100;
    const reply = 105;
    const error = .05; // 5%
    const isCorrect = quiz.isCorrectNumeric(answer, reply, error);
    expect(isCorrect).toBeTruthy();
  });

  test("Reply with some (-negative) error allowed should be correct", () => {
    const answer = 100;
    const reply = 95;
    const error = .05; // 5%
    const isCorrect = quiz.isCorrectNumeric(answer, reply, error);
    expect(isCorrect).toBeTruthy();
  });

  test("Reply exceeded the (+positive) error allowed, therefore should be incorrect.", () => {
    const answer = 100;
    const reply = 106;
    const error = .05; // 5%
    const isCorrect = quiz.isCorrectNumeric(answer, reply, error);
    expect(isCorrect).toBeFalsy();
  });

  test("Reply exceeded the (+negative) error allowed, therefore should be incorrect.", () => {
    const answer = 100;
    const reply = 90;
    const error = .05; // 5%
    const isCorrect = quiz.isCorrectNumeric(answer, reply, error);
    expect(isCorrect).toBeFalsy();
  });

  test("All replies should be correct", () => {
    const answer = [1, 2, 3];
    const reply = [1, 2, 3];
    const isCorrect = quiz.isCorrectNumeric(answer, reply, undefined);
    expect(isCorrect).toEqual([true, true, true]);
  });

  test("Second reply should be false", () => {
    const answer = [1, 2, 3];
    const reply = [1, 0, 3];
    const isCorrect = quiz.isCorrectNumeric(answer, reply, undefined);
    expect(isCorrect).toEqual([true, false, true]);
  });

  test("Third reply should be false", () => {
    const answer = [100, 1000, 3];
    const reply = [95, 1050, 10];
    const error = .05; // 5%
    const isCorrect = quiz.isCorrectNumeric(answer, reply, error);
    expect(isCorrect).toEqual([true, true, false]);
  });
})


describe("Tests for string corrections", () => {
  const quiz = new Quiz();

  test("Reply should be correct", () => {
    const answer = "yellow";
    const reply = "yellow";
    const isCorrect = quiz.isCorrectString(answer, reply);
    expect(isCorrect).toBeTruthy();
  });

  test("Reply with with white spaces, should be correct", () => {
    const answer = "yellow";
    const reply = "YeLloW     ";
    const isCorrect = quiz.isCorrectString(answer, reply);
    expect(isCorrect).toBeTruthy();
  });

  test("Reply should be false", () => {
    const answer = "yellow";
    const reply = "yell0w     ";
    const isCorrect = quiz.isCorrectString(answer, reply);
    expect(isCorrect).toBeFalsy();
  });

  test("All replies should be correct", () => {
    const answer = ["blue", "yellow", "orange"];
    const reply = ["blue", "yellow", "orange"];
    const isCorrect = quiz.isCorrectString(answer, reply);
    expect(isCorrect).toEqual([true, true, true])
  });

  test("All replies with white spaces should be correct", () => {
    const answer = ["blue", "yellow", "orange"];
    const reply = ["Blue", "yellOw   ", "    Orange   "];
    const isCorrect = quiz.isCorrectString(answer, reply);
    expect(isCorrect).toEqual([true, true, true])
  });

  test("Second reply should be false", () => {
    const answer = ["blue", "yellow", "orange"];
    const reply = ["Blue", "green   ", "    Orange   "];
    const isCorrect = quiz.isCorrectString(answer, reply);
    expect(isCorrect).toEqual([true, false, true])
  });

})


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
    expect(quiz.isCorrect(questionString, questionShadow)).toBeTruthy();
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

  test("Multiple replies should be correct", () => {
    const question = {
      question: "This is a test question",
      type: "number",
      answer: [1, 2],
      answers: [1, 2, 3, 4]
    }
    let reply = [1, 2];
    quiz.appendQuestion(question);
    quiz.setCurrentReply(reply);
    const questionShadow = quiz.getCurrentQuestionShadow();
    expect(quiz.isCorrect(question, questionShadow)).toEqual([true, true]);
  });

})
