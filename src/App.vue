<template>
  <v-app>
    <TheNavBar @show-game-menu="handleShowGameMenu"/>
    <v-content>
      <TheGame
          ref="game"
          @round="handleRound"
      />
      <TheGameMenu
          :isOpen="isGameMenuOpen"
          :options="gameMenuOptions"
          @start-new-game="handleNewGame"
          @resume-game="handleResumeGame"
      />
      <TheGameBoardRedactor :isOpen="isGameBoardRedactorOpen" @start-game="handleStartGame"/>
    </v-content>
  </v-app>
</template>

<script setup>
import {ref} from 'vue'
import TheNavBar from './components/TheNavBar.vue'
import TheGameMenu from './components/TheGameMenu.vue'
import TheGameBoardRedactor from './components/TheGameBoardRedactor.vue'
import TheGame from './components/TheGame.vue'

import createPlayer from './scripts/createPlayer'

const game = ref(null)
const isGameMenuOpen = ref(true)
const isGameBoardRedactorOpen = ref(false)
const gameMenuOptions = ref({
  resume: {
    isDisabled: true,
  },
})
const pl = ref(null)
const pc = ref(null)
const plHasDamaged = ref(false)
const pcHasDamaged = ref(false)
const gameHasAwinner = ref(false)

const hideGameMenu = () => {
  isGameMenuOpen.value = false
}

const handleShowGameMenu = () => {
  isGameMenuOpen.value = true
}

const openGameBoardRedactor = () => {
  isGameBoardRedactorOpen.value = true
}

const closeGameBoardRedactor = () => {
  isGameBoardRedactorOpen.value = false
}

const handleNewGame = () => {
  gameHasAwinner.value = false
  gameMenuOptions.value.resume.isDisabled = false

  hideGameMenu()
  openGameBoardRedactor()
  game.value.resetTheGame()
}

const handleResumeGame = () => {
  hideGameMenu()
}

const handleStartGame = (plBoard, plBoardElement, pcBoard, pcBoardElement) => {
  closeGameBoardRedactor()

  pl.value = createPlayer({board: plBoard})
  pc.value = createPlayer({board: pcBoard, isPc: true})

  game.value.initTheGame(plBoardElement, pcBoardElement, pl.value, pc.value)
}

const handleRound = (pcCordAttack) => {
  if (!gameHasAwinner.value) {
    plHasDamaged.value = makePlTurn(pcCordAttack)
    game.value.updateTheBoardsInfo()

    if (pc.value.getBoard().isAllShipsSunk()) {
      gameHasAwinner.value = true
      gameMenuOptions.value.resume.isDisabled = true
      game.value.updateGameInfo('Congratulations you won The Game', 'rgb(43, 197, 87)')
      setTimeout(handleShowGameMenu, 3000)

      return
    }

    if (plHasDamaged.value) return

    game.value.updateGameInfo('Pc Turn!', 'rgb(226, 54, 54)')
    game.value.disablePcBoard()

    const delayPcTurn = (ms) => {
      setTimeout(() => {
        pcHasDamaged.value = makePcTurn()
        game.value.updateTheBoardsInfo()

        if (pl.value.getBoard().isAllShipsSunk()) {
          gameHasAwinner.value = true
          gameMenuOptions.value.resume.isDisabled = true
          game.value.updateGameInfo('Pc won The Game!', 'rgb(226, 54, 54)')
          setTimeout(handleShowGameMenu, 3000)

          return
        }

        if (pcHasDamaged.value) {
          delayPcTurn(ms)

          return
        }

        game.value.updateGameInfo('Your Turn!', 'rgb(43, 197, 87)')
        game.value.enablePcBoard()
      }, ms)
    }

    delayPcTurn(500)
  }
}

const makePlTurn = (pcCordAttack) => {
  const {x, y} = JSON.parse(pcCordAttack)
  const attackInfo = pl.value.attack({player: pc.value, x, y})
  game.value.updatePcBoard(pcCordAttack, attackInfo)

  return attackInfo === true || attackInfo.damagedShipData
}

const makePcTurn = () => {
  const {attackInfo, cord} = pc.value.attack({player: pl.value})
  const {x, y} = cord
  game.value.updatePlBoard(JSON.stringify({x, y}), attackInfo)

  return attackInfo === true || attackInfo.damagedShipData
}
</script>

<style>
@font-face {
  font-family: bfont;
  src: url('./assets/04B_30__.TTF');
}

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: inherit;
  user-select: none !important;
}

html {
  font-size: 10px !important;
}

@media screen and (max-width: 860px) {
  html {
    font-size: 7px !important;
  }
}

@media screen and (max-width: 410px) {
  html {
    font-size: 6px !important;
  }
}

@media screen and (max-width: 359) {
  html {
    font-size: 5px !important;
  }
}

@media screen and (max-width: 350px) {
  html {
    font-size: 4px !important;
  }
}
</style>
