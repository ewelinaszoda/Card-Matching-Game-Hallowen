class AudioController {
  constructor() {
    this.bgMusic = new Audio('Assets/Audio/creepy.mp3');
    this.flipSound = new Audio('Assets/Audio/flip.wav');
    this.matchSound = new Audio('Assets/Audio/match.wav');
    this.victorySound = new Audio('Assets/Audio/victory.wav');
    this.gameOverSound = new Audio('Assets/Audio/gameOver.wav');
    this.bgMusic.volume = 0.5;
    this.bgMusic.loop = true;
  }
  startMusic() {
      this.bgMusic.play();
  }
  stopMusic() {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
  }
  flip() {
      this.flipSound.play();
  }
  match() {
      this.matchSound.play();
  }
  victory() {
      this.stopMusic();
      this.victorySound.play();
  }
  gameOver() {
      this.stopMusic();
      this.gameOverSound.play();
  }
}

class MixOrMatch {
  constructor(totalTime, cards) {
      this.cardsArray = cards;
      this.totalTime = totalTime;
      this.timeRemaining = totalTime;
      this.timer = document.getElementById('time-remaining')
      this.ticker = document.getElementById('flips');
      this.audioController = new AudioController();
  }

  startGame() {
      this.totalClicks = 0;
      this.timeRemaining = this.totalTime;
      this.cardToCheck = null;
      this.matchedCards = [];
      this.busy = true;
      setTimeout(() => {
          this.audioController.startMusic();
          this.shuffleCards(this.cardsArray);
          this.countdown = this.startCountdown();
          this.busy = false;
      }, 500)
      this.hideCards();
      this.timer.innerText = this.timeRemaining;
      this.ticker.innerText = this.totalClicks;
  }
  startCountdown() {
      return setInterval(() => {
          this.timeRemaining--;
          this.timer.innerText = this.timeRemaining;
          if(this.timeRemaining === 0)
              this.gameOver();
      }, 1000);
  }
  gameOver() {
      clearInterval(this.countdown);
      this.audioController.gameOver();
      document.getElementById('game-over-text').classList.add('visible');
  }
  victory() {
      clearInterval(this.countdown);
      this.audioController.victory();
      document.getElementById('victory-text').classList.add('visible');
  }
  hideCards() {
    this.cardsArray.forEach(card => {
        card.classList.remove('visible');
        card.classList.remove('matched');
    });
}

}