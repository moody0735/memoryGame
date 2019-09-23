




/*
 * Create a list that holds all of your cards
 */


//array of the cards
const icons= ["fa fa-diamond", "fa fa-diamond",
"fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor",
"fa fa-bolt", "fa fa-bolt",
"fa fa-cube", "fa fa-cube",
"fa fa-leaf", "fa fa-leaf",
"fa fa-bicycle", "fa fa-bicycle",
"fa fa-bomb", "fa fa-bomb" ]; 

const cardsContainer= document.querySelector(".deck");
let openCards=[];
let matchedCards=[];

//to start the game
function start() { 
	 let card_classes=shuffle(icons);
for (let i=0; i<icons.length; i++) {
	const card=document.createElement("li");
	card.classList.add("card");
	card.innerHTML=`<i class="${icons[i]}"></i>`;
	cardsContainer.appendChild(card);
	click(card);
	
}

}


let interval;
const timer=document.querySelector(".timer");
timer.innerHTML="0 mins : 0 secs";
let second=0, minute=0, hour=0;

//to start the timer

function startTimer() {
	interval= setInterval(function(){
		timer.innerHTML=minute+" mins "+" : "+second+" secs";
		second++;
		if (second==60){	
		minute++;
		second=0;
		}
		if (minute==60) {
			hour++;
			minute=0;
			
		}
	},1000);
}


function resetTimer() {
	
		
	if (clicks==1) { startTimer();}
	
}



//to open and show the cards
let clicks=0;

	function click(card) {
	card.addEventListener("click", function(){
		clicks++
		if (clicks==1) { startTimer();}
		const currentCard=this;
		const previousCard=openCards[0];
		
		if (openCards.length === 1) {
			
		   card.classList.add("open", "show", "disable");
		   openCards.push(this);
		   
		  compare(currentCard, previousCard);
			
		} else {
		
      currentCard.classList.add("open", "show", "disable");
		   openCards.push(this);
		
		}
		
	});	
	
}


//compare matched cards
function compare(currentCard, previousCard) {
	
	 if (currentCard.innerHTML === previousCard.innerHTML) {
			 
			  currentCard.classList.add("match");
			  previousCard.classList.add("match");
			  
			  matchedCards.push(currentCard, previousCard);
			  openCards=[];
			  isOver();
			  
			  
		    } else {
		
			setTimeout(function(){
				currentCard.classList.remove("open","show", "disable");
			previousCard.classList.remove("open", "show", "disable");
				 openCards=[];
			}, 500);
	
			}
			
			addMove();
	
}




//sweet alert from sweetalert2.com to popup modal
 function sweetAlert(reply, close) {
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

swalWithBootstrapButtons.fire({
  title: 'Congratulations',
  text: "You won't be able to revert this!",
  type: 'success',
  showCancelButton: true,
  confirmButtonText: 'Reply',
  cancelButtonText: 'Close',
  reverseButtons: true
  .then((result) => {
  if (result.value) {
    swalWithBootstrapButtons.fire(
      'Game Starting!',
      'Have Fun!',
      'success'
    )
	setTimeout(function(){
		window.location.reload();
	},2000);
  } else if (
    /* Read more about handling dismissals below */
   result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'pause',
      'Refresh the page if you want to play again.',
      'error'
    )
  }
})
})
}



	

//the game over and popup shows

function isOver() {
	if (matchedCards.length===icons.length) {
		//alert("GAME OVER!");
sweetAlert("congrats! your score:  "  +moves+  "moves in  " +minute+" minute  : " +second+  " seconds    ", "play again", "close", "reply"   );

		
		clearInterval(interval);
		
 		
	}
	addMove();
	
}




const movesContainer=document.querySelector(".moves");
let moves=0;
movesContainer.innerHTML=0;



//to add moves when 2 cards is opened
function addMove() {
	moves++;
	movesContainer.innerHTML=moves;
	rating();
}


const starsContainer=document.querySelector(".stars");
let grade="Great!";


//to shows star rating
function rating() {
	if (moves>=15) {
		if (grade !== "Average") {
			grade="Average";
			
    starsContainer.removeChild(starsContainer.children[0]);
		}
	}
		
	if (moves>24){
		if (grade !== "poor") {
			grade="poor";
	starsContainer.removeChild(starsContainer.children[0]);  
	
		}
	}
	
	
}


//to restart button
const restartBtn=document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
	cardsContainer.innerHTML="";
	start();
	matchedCards=[];
	moves=0;
	second=0, minute=0, hour=0;
	timer.innerHTML="0 mins : 0 secs";
	startTimer();
	clearInterval(interval);
	movesContainer.innerHTML= moves;
	starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li>
	<li><i class="fa fa-star"></i></li>
	<li><i class="fa fa-star"></i></li>`;
	
	
});

start();


	




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
