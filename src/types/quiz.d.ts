interface QuizInterface {
  removeQuiz(question: Question): void;
  appendQuiz(question: Question): void;
  qualify(): number | string;

  setQualifyScale(top: number): void;

  setQuestions(questions: Question[]): void;
  setAnswer(question: Question, answer: Answer): void;

  setMaxTime(maxTime: number): void;
  maxTimeReached(callback: Function): void;
  startTimeCount(): void;


}
