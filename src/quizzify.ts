export class Quiz implements QuizInterface {
  questions: Question[] = [];
  questionsCopy: Question[] = [];
  answers: [] = [];
  questionIndex: number = 0;
  maxScore: number = 10;

  constructor(questions: Question[] = []) {
    this.questions = questions;
    this.questionsCopy = [...questions];
    this.questionIndex = 0;
  }

  /** Resets the question index. */
  resetQuestionIndex(): void {
    this.questionIndex = 0;
  }

  /** Sets a new question index value */
  setQuestionIndex(index: number): void {
    if (index <= 0){
      index = 0;
    }
    if(index >= this.questions.length){
      index = this.questions.length
    }
    this.questionIndex = index;
  }

  /** Returns the current question */
  getCurrentQuestion(): Question {
    return this.questions[this.questionIndex];
  }

  /** Increases the question index */
  prevQuestion(): void {
    this.questionIndex = this.questionIndex <= 0 ? 0 : this.questionIndex-=1;
  }
  /** Decreases the question index */
  nextQuestion(): void {
    this.questionIndex = this.questionIndex >= this.questions.length - 1 ? this.questions.length - 1 : this.questionIndex+=1;
  }

  /** Updates the max score value */
  setMaxScore(maxScore: number): void {
    this.maxScore = maxScore;
  }

  /** Updates the replied value of a specific question */
  setAnswer(question: Question, replied: Answer): void {
    const questionIndex = this.findQuestionIndex(question);
    if(questionIndex)
      this.questionsCopy[questionIndex].replied = replied;
  }

  /** Sets a reply for the current question */
  setCurrentAnswer(answer: Answer): void {
    this.questionsCopy[this.questionIndex].replied = answer;
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

  /** Verify if the answer for a question is correct. */
  isCorrect(answer: Answer, replied: Answer): boolean {
    return false;
  }

  qualify(): string | number {
    let totalScore = 0;
    let equidistributed = this.maxScore / this.questions.length ;

    this.questions.map((question: Question, index: number) => {
      const answer = question.answer as Answer;
      const replied = this.questionsCopy[index].replied as Answer;
      const questionScore = question.score;
      if (this.isCorrect(answer, replied)){
        if(questionScore){
          totalScore += questionScore;
        }else {
          totalScore += equidistributed;
        }
      }
    })
    return totalScore;
  }

  /** Returns the index correspoindig to a question */
  findQuestionIndex(question: Question): number | undefined {
    return this.questions.findIndex((item: Question) => item.question === question.question);
  }

  /** Replaces questions for the current quiz */
  setQuestions(questions: Question[]): void {
    this.questions = questions;
    this.questionsCopy = [...questions];
  }

  /** Removes a question from the quiz */
  removeQuestion(question: Question): void {
    const questionIndex = this.findQuestionIndex(question);
    if(typeof questionIndex == "number"){
      this.questions.splice(questionIndex, 1);
    }
  }

  /** Adds a new question to the quiz */
  appendQuestion(question: Question): void {
    this.questions?.push(question);
  }

  static parseTemplate(template: string, variables: Object): string | undefined {
    const names = Object.keys(variables);
    const values = Object.values(variables);
    try{
      return  new Function(...names, "return `"+template+"`;")(...values)
    }catch(err){
      console.error(err);
      return undefined;
    }
  }

  /** Returns the number of questions */
  get length(): number {
    return this.questions.length;
  }

  get index(): number {
    return this.questionIndex;
  }

}
