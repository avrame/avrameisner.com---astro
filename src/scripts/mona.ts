import confetti from 'canvas-confetti'

const birthdayMessage = document.getElementById('birthday_message')
const gameGrid = document.getElementById("game_grid")

const happyBirthdayAudio = document.createElement('audio')
happyBirthdayAudio.src = '/audio/happy-birthday.wav'

const whooshAudio = document.createElement('audio')
whooshAudio.src = '/audio/whoosh.wav'

const flipCardAudio = document.createElement('audio')
flipCardAudio.src = '/audio/flip-card.wav'

interface Card {
  id: number,
  matched: boolean,
  html?: HTMLButtonElement,
}

const cards: Card[] = []
for (let i = 0; i < 8; i++) {
  cards.push({ id: i, matched: false })
  cards.push({ id: i, matched: false })
}

shuffle(cards)

let flippedCards: Card[] = []
let canFlipCards = true

cards.forEach(card => {
  const cellHtml = document.createElement("div")
  cellHtml.classList.add('cell')

  const cardHtml = document.createElement("button")
  cardHtml.classList.add('card')
  cardHtml.classList.add(`card_${card.id}`)
  card.html = cardHtml
  
  cardHtml.addEventListener('click', cardClickHandler)

  function cardClickHandler() {
    if (!canFlipCards) return
    if (flippedCards.length < 2) {
      flipCardAudio.play()
      cardHtml.classList.add('flipped')
      flippedCards.push(card)
      if (flippedCards.length == 2) {
        const [card1, card2] = flippedCards
        canFlipCards = false
        card1.html?.addEventListener('transitionend', () => {
          canFlipCards = true
        })
        setTimeout(() => {
          // The photos match
          if (card1.id == card2.id) {
            card1.html?.classList.add('matched')
            card2.html?.classList.add('matched')
            whooshAudio.play()
            card1.html?.removeEventListener('click', cardClickHandler)
            card2.html?.removeEventListener('click', cardClickHandler)
            card1.matched = true
            card2.matched = true
            card1.html?.addEventListener('transitionend', checkForWin)
          // The photos don't match so flip them back over
          } else {
            card1.html?.classList.remove('flipped')
            card2.html?.classList.remove('flipped')
          }
          flippedCards = []
        }, 2000) 
      }
    }
  }

  function checkForWin () {
    // Check if all cards have been matched
    if (cards.every(card => card.matched)) {
      // Remove the blur for the birthday message!
      birthdayMessage?.classList.remove('blurred')
      gameGrid?.classList.add('hidden')
      happyBirthdayAudio.play()
      confetti({
        particleCount: 300,
        spread: 120,
      })
    }
    const [card1] = flippedCards
    card1.html?.removeEventListener('transitionend', checkForWin)
  }

  const cardFrontHtml = document.createElement("div")
  cardFrontHtml.classList.add('card-face')
  cardFrontHtml.classList.add('front')
  cardHtml.appendChild(cardFrontHtml)

  const cardBackHtml = document.createElement("div")
  cardBackHtml.classList.add('card-face')
  cardBackHtml.classList.add('back')
  // cardBackHtml.innerText = card.id.toString()
  cardHtml.appendChild(cardBackHtml)
  
  cellHtml.appendChild(cardHtml)

  gameGrid?.appendChild(cellHtml)
})

function shuffle(array: any[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [
      array[currentIndex], array[randomIndex]
    ] = [
      array[randomIndex], array[currentIndex]
    ]
  }
}