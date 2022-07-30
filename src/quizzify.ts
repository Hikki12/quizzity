export class Quiz implements QuizInterface {
  constructor() {}
  setQualifyScale(top: number): void {
    throw new Error("Method not implemented.");
  }
  setAnswer(question: Question, answer: Answer): void {
    throw new Error("Method not implemented.");
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
  qualify(): string | number {
    throw new Error("Method not implemented.");
  }
  setQuestions(questions: Question[]): void {
    throw new Error("Method not implemented.");
  }
  removeQuiz(question: Question): void {
    throw new Error("Method not implemented.");
  }
  appendQuiz(question: Question): void {
    throw new Error("Method not implemented.");
  }
}
