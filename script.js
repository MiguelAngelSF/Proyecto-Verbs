///////////////CONSTANTES PARA OBTENER LOS ELEMENTOS VERBO, IMAGEN Y AUDIO
const showVerb = document.getElementById("showVerb");
const showImage = document.getElementById("showImage");
const showAudio = document.getElementById("showAudio");

///////////////CONSTANTES PARA OBTENER LOS ELEMENTOS DE LAS CASILLAS DE RESPUESTAS
const first = document.getElementById("first-verb");
const second = document.getElementById("second-verb");
const third = document.getElementById("third-verb");
const fourth = document.getElementById("fourth-verb");

///////////////CONSTANTES PARA EL CONTADOR, BOTON Y CONTENEDOR
const next = document.getElementById("next");
const verbsCounter = document.getElementById("verbs-counter");
const allRightCounter = document.getElementById("all-right-answers");
const verbsContainer = document.getElementById("verbs-container");

///////////////LENGTH PARA SABER CUANTOS VERBOS SON EN TOTAL
const numberOfVerbs = verbs.length;

let answerRoullete = [0,1,1,1]; ////DETECTA UNA SOLA RESPUESTA CORRECTA
let everyNumberOfVerbs = [];
let rightAnswer; 
let rightAnswersCounter = 0; ////CONTADOR DE RESPUESTAS CORRECTAS

///////////////BOTON DE PLAY PARA COMENZAR
next.addEventListener("click", function(){
    ponerVerbo();
    next.style.display = 'none';
}); 

makeRandomList(); ////LISTA RANDOM

let lastPosition = everyNumberOfVerbs.length-1; ////SE COMIENZA DESDE LA ULTIMA POSICION

/////////////////////FUNCION PARA OBTENER UNA LISTA DE VERBOS RANDOM
function makeRandomList(){
    for (var i = 0; i < numberOfVerbs; i++){
        everyNumberOfVerbs.push(i);
    }
    everyNumberOfVerbs = everyNumberOfVerbs.sort(() => Math.random() - 0.5);
}

/////////////////////FUNCION PARA DETECTAR LAS RESPUESTAS CORRECTAS Y EN SU DEFECTO LAS INCORRECTAS AL PRESIONAR CADA BOTON
function buttonEffect(itsRight,button){
    if (itsRight){
      button.classList.add('rightAnswer');
      setTimeout(function(){
        button.classList.remove('rightAnswer');
      },1000);
      rightAnswersCounter = rightAnswersCounter+1;
    }else{
      button.classList.add('wrongAnswer');
      setTimeout(function(){
        button.classList.remove('wrongAnswer');
      },1000);
    }
    setTimeout(function(){
      ponerVerbo();
    },500);
  }

/////////////////////DETECCION DEL PRIMER BUTON DE RESPUESTA
first.addEventListener("click",function(){
buttonEffect(isItRight_(first.innerHTML),this);
});
/////////////////////DETECCION DEL SEGUNDO BUTON DE RESPUESTA
second.addEventListener("click", function(){
buttonEffect(isItRight_(second.innerHTML),this);
});
/////////////////////DETECCION DEL TERCER BUTON DE RESPUESTA
third.addEventListener("click", function(){
buttonEffect(isItRight_(third.innerHTML),this);
});
/////////////////////DETECCION DEL CUARTO BUTON DE RESPUESTA
fourth.addEventListener("click", function(){
buttonEffect(isItRight_(fourth.innerHTML),this);
});

/////////////////////FUNCION PARA OBTENER UN ARRAY RANDOM Y MOSTRAR DIFERENTES RESPUESTAS
function shuffleAnswers(array) {
  let numberOfAnswerButtons = array.length;
  let randomIndex;
  while (numberOfAnswerButtons != 0) {
    randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
    numberOfAnswerButtons--;
    [array[numberOfAnswerButtons], array[randomIndex]] = [
    array[randomIndex], array[numberOfAnswerButtons]];
  }
  return array;
}

///////////////////MOSTRAR SI LA RESPUESTA ES CORRECTA O INCORRECTA
function isItRight_(answer){
  return answer==rightAnswer?true:false;
}

///////////////////FUNCION PARA MOSTRAR RESPUESTAS INCORRECTAS EN LOS BOTONES
function randomVerbo(notThisOne){
  theOne = Math.floor(Math.random()*verbos.length);
  return theOne == notThisOne?randomVerbo(notThisOne):theOne;
}

function ponerVerbo() {
  answerRoullete = shuffleAnswers(answerRoullete);

  let randomPosition = everyNumberOfVerbs[lastPosition];
  let imgText = "<img src='img/"+verbs[randomPosition]+".jpg'"; 
  imgText += "height:'240px' width='200px'>";


  first.classList.add("btn","btn-outline-primary","btn-md");
  second.classList.add("btn","btn-outline-primary","btn-md");
  third.classList.add("btn","btn-outline-primary","btn-md");
  fourth.classList.add("btn","btn-outline-primary","btn-md");

  if (lastPosition >= 0){
    var just_position = lastPosition+1;
    verbsCounter.innerHTML = ''+just_position+' / '+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;

    showVerb.innerHTML = verbs[randomPosition];
    showImage.innerHTML = imgText;
    showAudio.src = "audio/"+verbs[randomPosition]+".mp3";
    showAudio.play();

    first.innerHTML = !answerRoullete[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    second.innerHTML = !answerRoullete[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    third.innerHTML = !answerRoullete[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    fourth.innerHTML = !answerRoullete[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];

    rightAnswer = verbos[randomPosition];
    lastPosition = lastPosition - 1;
  }else{
    verbsCounter.innerHTML = "0 / " + numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: " + rightAnswersCounter;
    showVerb.innerHTML = "Thank you !";
    verbsContainer.innerHTML = ""; 
  }
}

