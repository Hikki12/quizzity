const quiz = new quizzify.Quiz(questions);
const questionContainer = document.getElementById('questionContainer');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const scoreIndicator = document.getElementById('scoreIndicator');


const renderScore = () => {
  scoreIndicator.innerHTML = `${quiz.qualify()} / ${quiz.length}`;
}

const renderAnswers = (answers, type, entry) => {
  let html = ``;
  if(entry === 'input'){
    html = `
      <input type="text" placeholder="Ingresa tu respuesta..." class="input input-accent h-16 text-xl text-white w-full" />
    `;
  }
  if(!!answers){
    answers.map((answer, index) => {
      html += `
        <div class="cursor-pointer bg-neutral text-xl p-4 rounded-md hover:border border-accent">
          ${answer}
        </div>
      `
    })
  }
  return html;
}

const renderQuestion = ({question, answers, type, entry}) => {
  let html = `
    <div class="h-96 w-full">
      <p class="text-xl mb-4">${question}</p>
      <div class="grid gap-3 overflow-y-auto">
        ${renderAnswers(answers, type, entry)}
      </div>
    </div>
  `;
  return html;
}

const renderCurrentQuestion = () => {
  const currentQuestion = quiz.getCurrentQuestion();
  questionContainer.innerHTML = renderQuestion(currentQuestion);
}

const nextQuestion = () => {
  quiz.nextQuestion()
  renderCurrentQuestion();
}

const prevQuestion = () => {
  quiz.prevQuestion()
  renderCurrentQuestion();
}

renderCurrentQuestion();
renderScore();

nextButton.addEventListener('click', nextQuestion);
prevButton.addEventListener('click', prevQuestion);

