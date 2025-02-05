## Quizzify
A library to create dynamic quizzes.

<div style="display:flex; gap: 10px;">

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

[![codecov](https://img.shields.io/codecov/c/gh/Hikki12/quizzify?logo=codecov&style=for-the-badge&token=LCTR6FVZR3)](https://codecov.io/gh/Hikki12/quizzify)

</div>

## Install
```
npm i quizzify
```

## From CDN
```html
<script src="https://cdn.jsdelivr.net/npm/quizzify@1.0.0/dist/quizzify.umd.js" type="module"></script>
```

## Question Structure
| property | types                                        | Description                             |
|----------|----------------------------------------------|-----------------------------------------|
| question | string                                       | A question statement                    |
| type     | number \| string                             | The answer type                         |
| input    | "text" \| "number" \| "radio"                | The type of input                       |
| answer?   | number \| string \| number [ ] \| string [ ] | The real answer                         |
| answers  | number \| string \| number [ ] \| string [ ] | The possibles answers                   |
| reply? | number \| string \| number [ ] \| string [ ] | Answer replied by the user              |
| error?   | number                                       | Max error allowed for numerical replies |
| score?   | number                                       | A score value for the question         |

## Question example

```js
const question = {
  question: 'some question statement',
  type: "number", // type of question
  input: "text", // type of answer input
  answer: 2.20, // (optional) real answer
  answers: [-2.20, 2.20, 1.10, -1.10] // possible answers
}
```


```js
// server.js

const question1 = {
  question: "How much is 2 + 2.5?",
  type: "number",
  entry: "input",
  value: 4.5,
  error: 10 // - + error percentage allowed
}

const question2 = {
  question: "What of next numbers is prime?",
  type: "string",
  answers: [
    "9",
    "10",
    "11",
    "12"
  ]
}


const questions = [question1, question2]
```

---
```js
  // client.js

  const API = 'https://someapi.com';
  const questions = await fetch(API);

  const quiz = new Quiz(questions);

  quiz.start();

  // for response;
  const currentAnswer = someInput.value;
  quiz.setCurrentAnswer(currentAnswer);

  // end quiz
  quiz.end();
  const myAnswers = quiz.getAnswers();
```


## Multiple Choice Question

```js
const question = {
  question: "if A = B + C then:",
  value: ["B - A = - C", "A - C = B"],
  type: "radio",
  answers: [
    "B - A = - C", // 1
    "C - A = B", // 2
    "A - C = B", // 3
    "None" // 4
  ]
}
```
---
## Dynamic string template
```js
const question = "The temperature value is ${temperature} °C"
const variables = { temperature: 12.0 }
quiz.parseTemplate(question, variables);
```
```sh
>> The temperature value is 12.0 °C
```


```js

// Define some variables
const variables = {
  "speed": {
    type: "number",
    value: 0,
    default: 0,
    min: -20,
    max: 30
  },
  "angle": {
    type: "number",
    value: 0,
    default: 0,
    min: 0,
    max: 360
  },
  "color": {
    type: "string",
    value: "",
    default: "red",
  }
}

const quiz = new Quiz(questions, variables);
```

## License
MIT
