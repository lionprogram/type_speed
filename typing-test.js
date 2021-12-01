const TIME_LIMIT = 60;
const TEXT1 =
  "سعی نکنید همه چیز را بدانید. شما ممکن است خیلی چیزها را دیده و انجام داده باشید، اما لزوما به این معنی نیست که شما می دانید بهترین است. سعی نکنید به مردم بگویید که چگونه می توانند کارها را به شیوه ای بهتر انجام دهند یا اینکه بهتر می توانند کاری انجام دهند.";
const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
let wpmText = document.getElementById("wpm");
let errorText = document.getElementById("errors");
let timerText = document.getElementById("time");
let accuracyText = document.getElementById("accuracy");

let typeText = document.getElementById("type-text");

let textArea = document.getElementById("textarea");

let timeLeft = 0;
let timeElapsed = 0;
let errors = 0;
let accuracy = 0;
let typedCharacter = 0;
let timer = null;
let hasStarted = false;

let x;
let e=0;
let wp;

initializeTest({ timeLimit: TIME_LIMIT, text: TEXT });







function initializeTest({ timeLimit, text }) {
  // TODO: Complete this function
   
  //TEXT To Span:
   
   let type =document.getElementById('type-text');
   for(let i = 0;i<text.length;i++){
	   if(text[i] == ' '){
		   	type.innerHTML +=  `<span> ${text[i]}&nbsp;</span>`; 

	   }else{
	type.innerHTML += `<span> ${text[i]}</span>`; 
	   }
   }
   
  typeText.style.display = 'flex';
  typeText.style.flexWrap = 'wrap';
  typeText.style.flexDirection = 'row-reverse';
  
  
}


function update(event) {
  if (!hasStarted) {
    timer = setInterval(updateTimer(TIME_LIMIT), 1000);
    hasStarted = true;
	updateWpm();
  }
	
  updateCharactersStatus();

  typedCharacter++;
  updateErrors();
  updateAccuracy();
  if(typedCharacter == TEXT.length){
		finishTest()
	}
}

function updateCharactersStatus() {
	//console.log(e.keyCode.toString());
	
	
	if(textArea.value[typedCharacter] == TEXT[typedCharacter]){
		
		typeText.childNodes[typedCharacter].removeAttribute('class');
		typeText.childNodes[typedCharacter].setAttribute("class", "correct-char");
		
	}else if(textArea.value[typedCharacter] != TEXT[typedCharacter] && textArea.value[typedCharacter] != undefined){
		
		
		typeText.childNodes[typedCharacter].removeAttribute('class');
		typeText.childNodes[typedCharacter].setAttribute("class", "incorrect-char");
		
		errors++;
		
	}
	else if(textArea.value[typedCharacter] == undefined)
	{
		
		typedCharacter--;
		typeText.childNodes[typedCharacter].removeAttribute('class');
		console.log(typedCharacter);
		if(typedCharacter >= 0){
		 // debugger;
		  typedCharacter--;
		  
		}
		if(errors > 0){
			errors--;
		}
		
	}

}

function updateAccuracy() {
  // TODO: Complete this function
  
  accuracyText.innerHTML = Math.round((typedCharacter - errors) / typedCharacter * 100);
}

function updateErrors() {
  // TODO: Complete this function
  //debugger;
  
  errorText.innerHTML = errors;
}

function updateWpm() {
  // TODO: Complete this function
  wp = setInterval(()=>{
	  timeElapsed++;
	  wpmText.innerHTML = Math.round(typedCharacter / 5 / timeElapsed *60);
  },1000);
  
}

function updateTimer(timeLimit) {
  // TODO: Complete this function
  x = setInterval(()=>{
	  
	  if(timeLimit <= 10){
		timerText.style.color = "red";
	  }else{
		timerText.style.color = "black";  
	  }
	  if(timeLimit === 0){
		  finishTest()
		  
		  
		  
	  }else if(timeLimit >= 0){
	  timeLimit--;
	  timerText.innerHTML = timeLimit;
	  
	  }
	  
  },1000);
}

function finishTest() {
  // TODO: Complete this function
  clearInterval(x);
  clearInterval(wp);
  textArea.disabled = true;
  timeLimit = 60;
		  
		  alert('End.');
		  //textArea.value = '';
		  hasStarted = false;
		  typedCharacter = 0;
}
