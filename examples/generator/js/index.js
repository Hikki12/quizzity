const questionContainer = document.getElementById('questionContainer');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const scoreIndicator = document.getElementById('scoreIndicator');



const renderScore = () => {
  scoreIndicator.innerHTML = `${quiz.qualify()} / ${quiz.length}`;
}


const setReply = (id, render=false) =>{
  const reply = document.getElementById(id).value;
  console.log("reply: ", reply);
  quiz.setCurrentAnswer(reply);
  if (render) renderCurrentQuestion();
}

const renderAnswers = (question) => {
  console.log("input: ", question);
  const { answers, input } = question;

  const currentReply = quiz.getCurrentReply();
  console.log("currentReply: ", currentReply);

  let html = ``;

  if(input === 'input'){
    const id = `question-${quiz.index}-answer-${1}`;
    html = `
      <input value="${currentReply ? currentReply: ''}"  id="${id}" onchange="setReply('${id}', false)" type="text" placeholder="Ingresa tu respuesta..." class="input input-accent h-16 text-xl w-full" />
    `;
  }
  if(!!answers){
    answers.map((answer, index) => {
      const id = `question-${quiz.index}-answer-${index}`;
      const hasReply = answer === currentReply;
      html += `
        <input value="${answer}" id="${id}" onclick="setReply('${id}', true)" class="${hasReply ? 'bg-orange-600 text-white' : ''} cursor-pointer text-xl p-4 rounded-md hover:border border-accent appearance-none focus:outline-none focus:shadow-outline   " />
      `
    })
  }
  return html;
}

const renderQuestion = (question) => {
  let html = `
    <div class="h-96 w-full">
      <p class="text-xl mb-4">${question.question}</p>
      <div class="grid gap-3 overflow-y-auto">
        ${renderAnswers(question)}
      </div>
    </div>
  `;
  return html;
}

const renderCurrentQuestion = () => {
  const currentQuestion = quiz?.getCurrentQuestion();
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


nextButton.addEventListener('click', nextQuestion);
prevButton.addEventListener('click', prevQuestion);


window.onload = () => {
  const quiz = window.quiz;
  renderCurrentQuestion();
  renderScore();
}
