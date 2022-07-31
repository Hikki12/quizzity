type Qtype = number | string;
type Answer = number | string;
type Input = "text" | "number" | "radio";


interface Question {
  question: string;
  type: Qtype;
  input?: Input;
  answer?: Answer | Answer[];
  answers: Answer | Answer[];
  replied?: Answer;
  error?: number;
  score?: number;
}
