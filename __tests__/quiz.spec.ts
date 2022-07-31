// import { questions } from "./sample";
import { Quiz } from "../src/quizzify";


describe("Testing quiz methods", () => {
  test("parse template string", ()=> {
    const variables = {
      template: 12.0
    }
    const question = "the value of temperature is ${temperature}";
    const parsed = Quiz.parseTemplate(question, variables);
    console.log(parsed)
    expect(typeof 2).toBe("number");
  });
});
