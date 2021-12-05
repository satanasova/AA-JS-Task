

let quizIndex = 0;

function quiz(quizID,questionsArray) {
    quizIndex++;
    const questionsCount = questionsArray.length;

    const quizContainer = document.querySelector(quizID);
    const finish = quizContainer.querySelector('.btn-finish');
    const resultTemplate = quizContainer.querySelector('[data-template="result"]');
    resultTemplate.removeAttribute('data-template');
    resultTemplate.remove();
    const invalidMsg = quizContainer.querySelector('.invalidMsg');
    const sliderContainer = quizContainer.querySelector('.slider-container');
    const slider = sliderContainer.querySelector('.slider');
    const slideTemplate = slider.querySelector('[data-template="slide"]');
    slideTemplate.removeAttribute('data-template');
    slideTemplate.remove();

    initSlides();
    initSlider();
    finish.addEventListener('click', finishQuiz);

    function initSlides() {
        const choiceTemplate = slideTemplate.querySelector('[data-template="choice"]');
        choiceTemplate.removeAttribute('data-template');
        choiceTemplate.remove();
        
        questionsArray.forEach((questionData, questionIdx) => {
            const newSlide = slideTemplate.cloneNode(true);
            const newSlideIdx = questionIdx + 1 
            const targetContainerForChoices = newSlide.querySelector('.choices');
    
            newSlide.setAttribute('data-Idx', newSlideIdx);
            newSlide.querySelector('.question-num').innerText = `Question ${newSlideIdx}/${questionsCount}`
            newSlide.querySelector('.question').innerText = questionData.question;
    
            questionData.choices.forEach((choice, choiceIdx) => {
                const newChoice = choiceTemplate.cloneNode(true);
                const choiceInput = newChoice.querySelector('input');
                const choiceLabel = newChoice.querySelector('label');
                choiceInput.setAttribute('name', `quiz-${quizIndex}-choices-${newSlideIdx}`);
                choiceInput.setAttribute('id', `quiz-${quizIndex}-choice-${newSlideIdx}-${choiceIdx}`);
                choiceLabel.setAttribute('for', `quiz-${quizIndex}-choice-${newSlideIdx}-${choiceIdx}`);
                choiceLabel.innerText = choice;
    
                if(choiceIdx === questionData.answer){
                    choiceInput.classList.add('answer')
                }
    
                targetContainerForChoices.append(newChoice)
                // console.log(questionIdx,choice,choiceIdx,questionData.answer);
            })
    
            // console.log(newSlide);
            slider.append(newSlide)
        })
    }

    function initSlider() {
        // const slidesCount = sliderContainer.querySelectorAll('.slide').length;
        let sliderIdx = + slider.getAttribute('data-idx');
        const prev = sliderContainer.querySelector('.btn-prev');
        const next = sliderContainer.querySelector('.btn-next');
    
        sliderContainer.addEventListener('click', e => {
            // console.log(e.target);
            if (e.target === next) {
                slider.scrollBy({top: 0, left: slider.offsetWidth, behavior: 'smooth'});
    
                if(sliderIdx < questionsCount){
                    sliderIdx++;
                    slider.setAttribute('data-idx', sliderIdx);
                }
            } else if (e.target === prev) {
                slider.scrollBy({top: 0, left: -slider.offsetWidth, behavior: 'smooth'});
    
                if(sliderIdx > 1){
                    sliderIdx--;
                    slider.setAttribute('data-idx', sliderIdx);
                }
            }
        })
    }
  
    function finishQuiz() {
        const slides = Array.from(slider.querySelectorAll('.slide'));
        let correctAnswersCount = 0;
        
        slides.forEach(slide => {
            const choiceInputs = Array.from(slide.querySelectorAll('.form-check-input'));
            const answerInput = slide.querySelector('.form-check-input.answer');

            // initInputs(slide,choiceInputs)
            if (choiceInputs.some(input => input.checked)){
                slide.classList.add('answered');
            }
            if(answerInput.checked){
                correctAnswersCount++;
            }
        })

        if (slides.every(slide => slide.classList.contains('answered'))){
            invalidMsg.classList.add('d-none');
            const successRate = parseInt((correctAnswersCount/questionsCount)*100);
            const newResult = resultTemplate.cloneNode(true);
            newResult.querySelector('.result-num').innerText = `${correctAnswersCount}/${questionsCount}`;

            if (successRate <= 40) {
                newResult.querySelector('.result-content').classList.add('alert-danger');
                newResult.querySelector('.result-msg').innerText = 'Poor Result';
            } else if (successRate > 40 & successRate <= 70) {
                newResult.querySelector('.result-content').classList.add('alert-warning');
                newResult.querySelector('.result-msg').innerText = 'Good Result';
            } else if (successRate > 70) {
                newResult.querySelector('.result-content').classList.add('alert-success');
                newResult.querySelector('.result-msg').innerText = 'Excellent Result';
            }

            quizContainer.append(newResult);

            newResult.querySelector('.btn-restart').addEventListener('click', () => {
                newResult.remove();
                correctAnswersCount = 0;
                slides.forEach(slide => {
                    slide.classList.remove('answered');
                    const checkedInput = slide.querySelector('.form-check-input:checked');
                    checkedInput.checked = false;
                })
                slider.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            })

        } else {
            invalidMsg.classList.remove('d-none');
        }
    }
}






const questionsJS = [
    {
        question: 'Which of the following function of Array object removes the first element from an array and returns that element?',
        choices: ['reverse()','shift()','some()','slice()'],
        answer: 1
    },
    {
        question: 'Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?',
        choices: ['push()','pop()','map()','join()'],
        answer: 0
    },
    {
        question: 'Which built-in method combines the text of two strings and returns a new string?',
        choices: ['attach()','slice()','concat()','None of the above'],
        answer: 2
    }

];

const questionsJS2 = [
    {
        question: 'Which of the following function of Array object removes the first element from an array and returns that element?',
        choices: ['reverse()','shift()','some()','slice()'],
        answer: 1
    },
    {
        question: 'Which built-in method combines the text of two strings and returns a new string?',
        choices: ['attach()','slice()','concat()','None of the above'],
        answer: 2
    }
];