type Qtype = number | string;
type Answer = number | string | undefined;
type Input = "text" | "number" | "radio";

interface Question {
  question: string;
  type: Qtype;
  input?: Input;
  answer?: Answer | Answer[];
  answers: Answer | Answer[];
  reply?: Answer | Answer[];
  error?: number;
  score?: number;
}
