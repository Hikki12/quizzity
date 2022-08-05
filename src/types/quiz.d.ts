interface QuizInterface {
  questions: Question[];
  questionsShadow: Question[];
  questionIndex: number;

  setMaxTime(maxTime: number): void;
  maxTimeReached(callback: Function): void;
  startTimeCount(): void;

  removeQuestion(question: Question): void;
  appendQuestion(question: Question): void;
  clearString(str: string): string;

  isCorrectNumeric(
    answer: Answer | Answer[],
    reply: Answer | Answer[],
    error: number | undefined
  ): boolean | boolean[];
  isCorrectString(
    answer: Answer | Answer[],
    reply: Answer | Answer[]
  ): boolean | boolean[];
  isCorrect(question: Question, questionreply: Question): boolean | boolean[];

  qualify(): number | string;

  getUniformScore(): number;
  setMaxScore(top: number): void;

  setQuestions(questions: Question[]): void;
  getCurrentReply(): Answer | Answer[] | undefined;
  setCurrentReply(reply: Answer | undefined): void;
  setReply(question: Question, answer: Answer): void;

  getCurrentQuestion(): Question;
  nextQuestion(): void;
  prevQuestion(): void;
  resetQuestionIndex(): void;
  setQuestionIndex(index: number): void;

  getCurrenQuestionShadow(): Question;
}
