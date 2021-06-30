const startButton = document.querySelector(".start-btn");
const NameBox = document.querySelector(".name-box");
const exitButton = document.querySelector(".buttons .quit");
const continueButton = document.querySelector(".buttons .continue");
const nextbutton = document.querySelector("footer .next-btn");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const answers = document.querySelector(".answers");
const restart = document.querySelector(".buttons .restart");
const quit = document.querySelector(".result-box .buttons .quit");
const userName = document.querySelector(".input-name");
const questionsCounterText = document.querySelector("footer .total-questions")
const nameValue=userName.value;

let questionsCounter = 0;
let questionNumber = 1;
let userScore = 0;
startButton.onclick = ()=>{
    NameBox.classList.add("activeName"); 
}

exitButton.onclick = ()=>{
    NameBox.classList.remove("activeName"); 
}

continueButton.onclick = ()=>{
    NameBox.classList.remove("activeName"); 
    quizBox.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1);
}


restart.onclick = ()=>{
    quizBox.classList.add("activeQuiz"); 
    resultBox.classList.remove("activeResult"); 
    questionsCounter = 0;
    questionNumber = 1;
    userScore = 0;
    showQuetions(questionsCounter);
    queCounter(questionNumber); 
    nextbutton.classList.remove("show"); 
}

quit.onclick = ()=>{
    window.location.reload();
 }

nextbutton.onclick = ()=>{
    if(questionsCounter < questions.length - 1){ 
        questionsCounter++;
        questionNumber++; 
        showQuetions(questionsCounter); 
        queCounter(questionNumber); 
        nextbutton.classList.remove("show"); 
    }else{
        showResult();
    }
}

function showQuetions(index){
    const que_text = document.querySelector(".question");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    answers.innerHTML = option_tag; 
    const option = answers.querySelectorAll(".option");
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
let trueValue = '1';
let falseValue = '0';

function optionSelected(answer){
    let userAns = answer.textContent; 
    let correcAns = questions[questionsCounter].answer; 
    const allOptions = answers.children.length; 
    
    if(userAns === correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", trueValue);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", falseValue); 
    }
        for(i=0; i < allOptions; i++){
            if(answers.children[i].textContent === correcAns){ 
                answers.children[i].setAttribute("class", "option correct"); 
                answers.children[i].insertAdjacentHTML("beforeend", trueValue);
        }
    }
    for(i=0; i < allOptions; i++){
        answers.children[i].classList.add("disabled"); 
    nextbutton.classList.add("show"); 
    }
}

function showResult(){
    NameBox.classList.remove("activeName"); 
    quizBox.classList.remove("activeQuiz"); 
    resultBox.classList.add("activeResult"); 
    const scoreText = resultBox.querySelector(".score-text");
    if (userScore >= 5){ 
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 5){ 
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function queCounter(index){
    let totalQueCounter = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    questionsCounterText.innerHTML = totalQueCounter;
}