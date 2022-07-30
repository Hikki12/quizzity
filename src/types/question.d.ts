type qtype = "number" | "string"

interface Question {
  question: string;
  type: qtype;
  answers: string[];
  error?: number;
}
