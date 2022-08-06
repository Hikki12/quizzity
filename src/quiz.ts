export class Quiz implements QuizInterface {
  /**
   * A class for manage a quiz
   * @param questions - a list of questions
   *
   *
   * @note
   * `answer` word will used to a general answer provided a priori.
   * `reply` or `replied` is a kind of external answer provided during the quiz.
   */

  questions: Question[] = [];
  questionsShadow: Question[] = [];
  answers: [] = [];
  questionIndex = 0;
  maxScore = 10;

  constructor(questions: Question[] = []) {
    this.questions = questions;
    this.questionsShadow = [...questions];
    this.questionIndex = 0;
  }
  getCurrenQuestionShadow(): Question {
    throw new Error("Method not implemented.");
  }

  /** Resets the question index. */
  resetQuestionIndex(): void {
    this.questionIndex = 0;
  }

  /** Sets a new question index value */
  setQuestionIndex(index: number): void {
    if (index <= 0) {
      index = 0;
    }
    if (index >= this.questions.length) {
      index = this.questions.length;
    }
    this.questionIndex = index;
  }

  /** Returns the current question */
  getCurrentQuestion(): Question {
    return this.questions[this.questionIndex];
  }

  getCurrentQuestionShadow(): Question {
    return this.questionsShadow[this.questionIndex];
  }

  /** Decreases the question index */
  prevQuestion(): void {
    this.questionIndex =
      this.questionIndex <= 0 ? 0 : (this.questionIndex -= 1);
  }
  /** Increases the question index */
  nextQuestion(): void {
    this.questionIndex =
      this.questionIndex >= this.questions.length - 1
        ? this.questions.length - 1
        : (this.questionIndex += 1);
  }

  /** Updates the max score value */
  setMaxScore(maxScore: number): void {
    this.maxScore = maxScore;
  }

  /** Returns the current reply stored */
  getCurrentReply(): Answer | Answer[] | undefined {
    return this.questionsShadow[this.questionIndex].reply;
  }

  /** Updates the reply value of a specific question */
  setReply(question: Question, reply: Answer): void {
    const questionIndex = this.findQuestionIndex(question);
    if (questionIndex) this.questionsShadow[questionIndex].reply = reply;
  }

  /** Sets a reply for the current question */
  setCurrentReply(reply: Answer | Answer[]): void {
    this.questionsShadow[this.questionIndex].reply = reply;
  }

  setMaxTime(maxTime: number): void {
    throw new Error("Method not implemented.");
  }

  maxTimeReached(callback: Function): void {
    throw new Error("Method not implemented.");
  }

  startTimeCount(): void {
    throw new Error("Method not implemented.");
  }

  /** Removes white spaces from a string and convert it to lowercase
   * @param str - a string.
   */
  clearString(str: string): string {
    const cleanString = str.trim().toLowerCase();
    return cleanString;
  }

  /** Applies clearString() to an array of strings */
  clearStringArray(array: string[]): string[] {
    return array.map((str) => this.clearString(str));
  }

  /** Verify if a numeric answer is correct. If an error is provided it will evaluate `reply` on the
   * range of `reply >= answer * (1 - error)` && `reply <= answer * (1 + error)`
   *
   * @param answer {number} - a number
   * @param replid {number} - another number
   * @param error {number} - an arrow allowed between `answer` and `reply`
   */
  correctNumericAnswer(
    answer: Answer,
    reply: Answer,
    error: number | undefined
  ) {
    const answerNumeric = Number(answer);
    const replyNumeric = Number(reply);
    const errorNumeric = Number(error);

    if (!errorNumeric) return answerNumeric === replyNumeric;

    const errorAbs = Math.abs(errorNumeric);
    const min = answerNumeric * (1 - errorAbs);
    const max = answerNumeric * (1 + errorAbs);
    return replyNumeric >= min && replyNumeric <= max;
  }

  /** Applies correctNumbericAnswer to array of answers */
  correctNumbericAnswersArray(
    answers: Answer[],
    replies: Answer[],
    error: number | undefined
  ) {
    return answers.map((answer, index) =>
      this.correctNumericAnswer(answer, replies[index], error)
    );
  }

  /** Verifies if answer and reply are similar strings */
  correctStringAnswer(answer: Answer, reply: Answer) {
    if (typeof answer === "string" && typeof reply === "string") {
      const cleanAnswer = this.clearString(answer);
      const cleanreply = this.clearString(reply);
      return cleanAnswer === cleanreply;
    }
    return false;
  }

  /** Applies  correctStringAnswer to an array of answers */
  correctStringAnswerArray(answers: Answer[], replies: Answer[]) {
    return answers.map((answer, index) =>
      this.correctStringAnswer(answer, replies[index])
    );
  }

  /** Checks if a numeric answer or an array of numeric answers is correct */
  isCorrectNumeric(
    answer: Answer | Answer[],
    reply: Answer | Answer[],
    error: number | undefined
  ) {
    if (typeof answer === "number" && typeof reply === "number") {
      return this.correctNumericAnswer(answer, reply, error);
    }
    if (typeof answer === "object" && typeof reply === "object") {
      return this.correctNumbericAnswersArray(answer, reply, error);
    }
    return false;
  }

  /**
   * Checks if a string answer is true
   */
  isCorrectString(answer: Answer | Answer[], reply: Answer | Answer[]) {
    if (typeof answer === "string" && typeof reply === "string") {
      return this.correctStringAnswer(answer, reply);
    }
    if (typeof answer === "object" && typeof reply === "object") {
      return this.correctStringAnswerArray(answer, reply);
    }
    return false;
  }

  /** Verify if the answer for a question is correct. */
  isCorrect(question: Question, questionReply: Question): boolean | boolean[] {
    if (!questionReply.reply) return false;
    const { answer, error } = question;
    const { reply } = questionReply;

    if (question.type === "number") {
      return this.isCorrectNumeric(answer, reply, error);
    }

    if (question.type === "string") {
      return this.isCorrectString(answer, reply);
    }

    return false;
  }

  /** Returns the uniform score calculated as the maxScore divided by the length of the quiz */
  getUniformScore() {
    return this.maxScore / this.questions.length;
  }

  /** Calculates a single question score */
  qualifyQuestion(index: number) {
    let totalScore = 0;
    const uniformScore = this.getUniformScore();

    const question = this.questions[index];
    const questionReply = this.questionsShadow[index];
    const questionScore = question.score || uniformScore;
    const isCorrect = this.isCorrect(question, questionReply);

    if (typeof isCorrect === "boolean") {
      if (isCorrect) totalScore += questionScore;
    }

    if (typeof isCorrect === "object") {
      const itemScore = questionScore / isCorrect.length;
      isCorrect.map((correct) => {
        if (correct) totalScore += itemScore;
      });
    }

    return totalScore;
  }

  /** Calculates the current score of the quiz based on the correct replies given */
  qualify(): string | number {
    let totalScore = 0;
    this.questions.map((question: Question, index: number) => {
      totalScore += this.qualifyQuestion(index);
    });
    return totalScore;
  }

  /** Returns the index correspoindig to a question
   * @param question - a question object
   */
  findQuestionIndex(question: Question): number | undefined {
    return this.questions.findIndex(
      (item: Question) => item.question === question.question
    );
  }

  /** Replaces questions for the current quiz */
  setQuestions(questions: Question[]): void {
    this.questions = questions;
    this.questionsShadow = [...questions];
  }

  /** Removes a question from the quiz */
  removeQuestion(question: Question): void {
    const questionIndex = this.findQuestionIndex(question);
    if (typeof questionIndex == "number") {
      this.questions.splice(questionIndex, 1);
      this.questionsShadow.splice(questionIndex, 1);
    }
  }

  /** Adds a new question to the quiz */
  appendQuestion(question: Question, next: boolean = true): void {
    this.questions?.push(question);
    this.questionsShadow?.push(question);
    this.nextQuestion();
  }

  /** Renders a string template with some variables. */
  static parseTemplate(
    template: string,
    variables: Object
  ): string | undefined {
    const names = Object.keys(variables);
    const values = Object.values(variables);
    try {
      return new Function(...names, "return `" + template + "`;")(...values);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  /** Returns the number of questions */
  get length(): number {
    return this.questions.length;
  }

  /** Returns the current question index */
  get index(): number {
    return this.questionIndex;
  }
}
