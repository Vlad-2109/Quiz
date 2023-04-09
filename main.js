const questions = [
	{
		question: "Яка мова працює в браузері?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Що означає CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Що означає HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В якому році був створений JavaScript",
		answers: ["1996", "1995", "1994", "всі відповіді неправильні"],
		correct: 2,
	},
];

// Знаходимо елементи
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Змінні гри
let score = 0; // кількість правильних відповідей
let questionIndex = 0; // поточне питання

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	console.log('showQuestion')

	// Питання
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	// Варіанти відповідей
	for ([index, answerText] of questions[questionIndex]['answers'].entries()) {
		const questionTemplate = 
			`<li>
				<label>
					<input value='%number%' type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`
		
		const answerHTML = questionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', index + 1);

		listContainer.innerHTML += answerHTML;
	}
}

function checkAnswer() {
	console.log('checkAnswer started!');

	// Знаходимо вибрану радіо кнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	// Якщо відповідь не вибрана - нічого не робимо і виходимо з функції
	if (!checkedRadio) {
		submitBtn.blur();
		return;	
	}

	// Дізнаємося номер відповіді користувача
	const userAnswer = parseInt(checkedRadio.value);

	// Якщо відповідь вірна - збільшуємо рахунок
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}
	console.log('score =', score);

	if (questionIndex !== questions.length - 1){
		console.log('Це не останнє питання');
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		console.log('Це останнє питання');
		clearPage();
		showResults();
	}
}

function showResults() {
	console.log('showResults started');
	console.log(score);

	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;

	let title, message;
	
	// Варіанти заголовків і текста
	if (score === questions.length) {
		title = 'Вітаємо!!!'
		message = 'Ви відповіли правильно на всі питання =)';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Непоганий результат!';
		message = 'Ви відповіли правильно більш, ніж на половину запитань';
	} else {
		title = 'Потрібно постаратися';
		message = 'Поки у вас менше половини правильних відповідей';
	}

	// Результат
	let result = `${score} з ${questions.length}`;

	// Фінальна відповідь, підставляємо данні в шаблон
	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result);
	
	headerContainer.innerHTML = finalMessage;

	// Міняємо кнопку на "Грати знову"
	submitBtn.blur();
	submitBtn.innerText = 'Почати знову';
	submitBtn.onclick = () => history.go();
}