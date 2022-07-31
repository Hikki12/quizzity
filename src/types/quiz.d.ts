interface QuizInterface {
  questions: Question[];
  questionsCopy: Question[];
  questionIndex: number;

  removeQuestion(question: Question): void;
  appendQuestion(question: Question): void;

  isCorrect(answer: Answer, replied: Answer): boolean;
  qualify(): number | string;

  setMaxScore(top: number): void;

  setQuestions(questions: Question[]): void;
  setAnswer(question: Question, answer: Answer): void;

  setMaxTime(maxTime: number): void;
  maxTimeReached(callback: Function): void;
  startTimeCount(): void;

  getCurrentQuestion(): Question;
  nextQuestion(): void;
  prevQuestion(): void;
  resetQuestionIndex():void;
  setQuesitonIndex(index: number): void;

  setCurrentAnswer(answer: Answer): void;
}
