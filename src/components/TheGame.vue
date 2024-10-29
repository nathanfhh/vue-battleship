<template>
  <div class="game-wrapper">
    <div class="game-container">
      <div class="pl">
      </div>
      <div class="game-info"></div>
      <div class="pc">
      </div>
    </div>
    <QuestionModal
      v-if="showQuestionModal"
      :question="currentQuestion"
      :type="currentQuestion.type"
      @answered="handleQuestionAnswered"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import QuestionModal from './QuestionModal.vue'

const isGameInitiated = ref(false)
const plElement = ref(null)
const pcElement = ref(null)
const plBoardElement = ref(null)
const pcBoardElement = ref(null)
const plBoardInfoElement = ref(null)
const pcBoardInfoElement = ref(null)
const gameInfo = ref(null)
const pl = ref(null)
const pc = ref(null)
const emit = defineEmits(['round'])
const showQuestionModal = ref(false)
const currentQuestion = ref(null)
const pcCordAttack = ref(null)
const answeredQuestions = ref([])

const initTheGame = (plBoardEle, pcBoardEle, humanPlayer, computerPlayer) => {
  plElement.value = document.querySelector('.pl')
  pcElement.value = document.querySelector('.pc')
  gameInfo.value = document.querySelector('.game-info')
  plBoardElement.value = plBoardEle
  pcBoardElement.value = pcBoardEle
  pl.value = humanPlayer
  pc.value = computerPlayer

  renderTheBoards()
  renderTheBoardsInfo()
  updateTheBoardsInfo()
  updateGameInfo('Your Turn!')
  addPcBoardEvent()

  isGameInitiated.value = true
}

const renderTheBoards = () => {
  plElement.value.appendChild(plBoardElement.value)
  pcElement.value.appendChild(pcBoardElement.value)
}

const resetTheGame = () => {
  if (isGameInitiated.value) {
    updateGameInfo('')
    plBoardElement.value.remove()
    pcBoardElement.value.remove()
    plBoardInfoElement.value.remove()
    pcBoardInfoElement.value.remove()
  }
}

const addPcBoardEvent = () => {
  pcBoardElement.value.addEventListener('click', (e) => {
    if (e.target.classList.contains('spot')) {
      emit('round', e.target.dataset.cord)
    }
  })
}

const updatePcBoard = (cord, response) => {
  if (response === true) {
    const spot = pcBoardElement.value
        .querySelector(`.spot[data-cord=${JSON.stringify(cord)}]`)

    spot.append('x')
    spot.style.backgroundColor = 'rgb(248, 39, 39)'
    spot.style.lineHeight = '1'
    spot.style.pointerEvents = 'none'
    spot.classList.toggle('resize')
  }

  if (response === false) {
    const spot = pcBoardElement.value
        .querySelector(`.spot[data-cord=${JSON.stringify(cord)}]`)

    spot.append('*')
    spot.style.pointerEvents = 'none'
    spot.classList.toggle('resize')
  }

  if (response.damagedShipData) {
    const {damagedShipData, clearedBorders} = response
    const ship = document.createElement('div')
    ship.classList.add('ship')

    for (let i = 0; i < damagedShipData.ship.getLength(); i += 1) {
      const part = document.createElement('div')
      part.classList.add('part')
      part.append('x')
      ship.appendChild(part)
    }

    ship.classList.toggle('resize')

    const firstSpot = pcBoardElement.value
        .querySelector(`.spot[data-cord=${JSON.stringify(JSON.stringify(damagedShipData.coordinates[0]))}]`)

    ship.style['grid-auto-flow'] = damagedShipData.isVertical ? 'row' : 'column'
    ship.style.position = 'absolute'

    if (firstSpot.firstChild) firstSpot.firstChild.remove()
    firstSpot.appendChild(ship)

    clearedBorders.forEach((borderCord) => {
      const spotEl = pcBoardElement.value
          .querySelector(`.spot[data-cord=${JSON.stringify(JSON.stringify(borderCord))}]`)

      if (!spotEl.firstChild) {
        spotEl.append('*')
        spotEl.style.pointerEvents = 'none'
        spotEl.classList.toggle('resize')
      }
    })
  }
}

const updatePlBoard = (cord, response) => {
  if (response === true || response.damagedShipData) {
    const part = plBoardElement.value
        .querySelector(`.part[data-cord=${JSON.stringify(cord)}]`)

    part.append('x')
    part.style.backgroundColor = 'rgb(218, 100, 100)'
    part.classList.toggle('resize')

    if (response.damagedShipData) {
      const {clearedBorders} = response

      clearedBorders.forEach((borderCord) => {
        const spotEl = plBoardElement.value
            .querySelector(`.spot[data-cord=${JSON.stringify(JSON.stringify(borderCord))}]`)

        if (!spotEl.firstChild) {
          spotEl.append('*')
          spotEl.classList.toggle('resize')
        }
      })
    }
  }

  if (response === false) {
    const spot = plBoardElement.value
        .querySelector(`.spot[data-cord=${JSON.stringify(cord)}]`)

    spot.append('*')
    spot.classList.toggle('resize')
  }
}

const updateTheBoardsInfo = () => {
  const updateInfoFor = (player, boardInfoElement) => {
    const nameEl = boardInfoElement.firstElementChild
    const aliveShipsEl = boardInfoElement.lastElementChild
    const name = player.getName()
    const aliveShips = player.getBoard().getAliveShipsCount()

    if (`${nameEl.textContent} Board` !== name) {
      nameEl.textContent = `${name} Board`
    }

    if (`Alive Ships: ${aliveShipsEl.textContent}` !== aliveShips) {
      aliveShipsEl.textContent = `Alive Ships: ${aliveShips}`
    }
  }

  updateInfoFor(pl.value, plBoardInfoElement.value)
  updateInfoFor(pc.value, pcBoardInfoElement.value)
}

const renderTheBoardsInfo = () => {
  const createBoardInfo = () => {
    const infoElement = document.createElement('div')
    const name = document.createElement('h3')
    const aliveShips = document.createElement('h4')

    infoElement.classList.add('board-info')
    name.classList.add('name')
    aliveShips.classList.add('alive-ships')

    infoElement.appendChild(name)
    infoElement.appendChild(aliveShips)

    return infoElement
  }

  plBoardInfoElement.value = createBoardInfo()
  pcBoardInfoElement.value = createBoardInfo()

  plElement.value.appendChild(plBoardInfoElement.value)
  pcElement.value.appendChild(pcBoardInfoElement.value)
}

const updateGameInfo = (msg = '', color = 'rgb(43, 197, 87)') => {
  gameInfo.value.textContent = msg
  gameInfo.value.style.color = color

  if (!gameInfo.value.classList.contains('pulse')) {
    gameInfo.value.classList.add('pulse')
    gameInfo.value.classList.add('top-bot-borders')
  }

  if (!msg) {
    gameInfo.value.classList.remove('pulse')
    gameInfo.value.classList.remove('top-bot-borders')
  }
}

const disablePcBoard = () => {
  pcBoardElement.value.style.pointerEvents = 'none'
}

const enablePcBoard = () => {
  pcBoardElement.value.style.pointerEvents = 'auto'
}

const makePlTurn = (pcCordAttack) => {
  const {x, y} = JSON.parse(pcCordAttack)
  currentQuestion.value = getRandomQuestion()
  showQuestionModal.value = true
  pcCordAttack.value = pcCordAttack
  return false
}

const handleQuestionAnswered = (isCorrect) => {
  showQuestionModal.value = false
  if (isCorrect) {
    const {x, y} = JSON.parse(pcCordAttack.value)
    const attackInfo = pl.value.attack({player: pc.value, x, y})
    updatePcBoard(pcCordAttack.value, attackInfo)
    answeredQuestions.value.push(currentQuestion.value)
    return attackInfo === true || attackInfo.damagedShipData
  } else {
    return false
  }
}

defineExpose({
  initTheGame,
  resetTheGame,
  updatePcBoard,
  updatePlBoard,
  disablePcBoard,
  enablePcBoard,
  updateTheBoardsInfo,
  updateGameInfo,
  makePlTurn,
  handleQuestionAnswered
})

</script>

<style scoped>
.game-container {
  font-family: bfont;
  --spot-size: 4rem;
  padding: 4rem;
  display: flex;
  justify-content: space-around;
}

.pl, .pc {
  display: flex;
  flex-direction: column;
}

.pl >>> .ship,
.pc >>> .ship {
  cursor: initial;
}

.pc >>> .spot,
.pl >>> .spot {
  text-shadow: 0 0 2px black;
  text-align: center;
  font-size: var(--spot-size);
}

.pc >>> .spot {
  cursor: crosshair;
}

.pc >>> .spot:hover {
  background-color: rgb(98, 0, 255);
}

.pc >>> .spot .ship {
  display: grid;
  grid-auto-flow: column;
  background-color: rgb(187, 82, 82);
  grid-gap: 4px;
  z-index: 69;
}

.pc >>> .spot .part {
  width: var(--spot-size);
  height: var(--spot-size);
  background-color: rgb(218, 100, 100);
  border: 4px solid rgb(70, 70, 70);
}

.pc >>> .spot .part,
.pl >>> .spot .part {
  text-shadow: 0 0 2px black;
  text-align: center;
  font-size: var(--spot-size);
  line-height: 0.745;
}

.pc >>> .board-info,
.pl >>> .board-info {
  text-shadow: 0 0 2px black;
  text-align: center;
  padding-left: var(--spot-size);
}

.pl >>> .board-info {
  color: rgb(43, 197, 87);
}

.pc >>> .board-info {
  color: rgb(226, 54, 54);
}

.pc >>> .board-info .name,
.pl >>> .board-info .name {
  border-bottom: 1px solid;
  font-size: 2.6rem;
}

.pc >>> .board-info .alive-ships,
.pl >>> .board-info .alive-ships {
  font-size: 2.4rem;
}

.game-info {
  font-size: 3.0rem;
  align-self: center;
  text-align: center;
  text-shadow: 0 0 6px black;
  width: 100%;
}

.top-bot-borders {
  padding: 1rem;
  margin: 1rem;
  border-top: 1px solid;
  border-bottom: 1px solid;
}

.pulse {
  animation: pulse 500ms alternate infinite;
}

.pc >>> .resize,
.pl >>> .resize {
  animation: resize 200ms 1 reverse;
}

@keyframes pulse {
  100% {
    box-shadow: inset 0 0 2px 1px rgb(82, 82, 82),
    0 0 2px 1px rgb(255, 255, 255);
    color: rgb(255, 255, 255);
  }
}

@keyframes resize {
  100% {
    transform: scale(1.16);
    background-color: rgb(226, 54, 54);;
  }
}

@media screen and (max-width: 1400px) {
  .pc >>> .board-info .alive-ships,
  .pl >>> .board-info .alive-ships {
    font-size: 1.8rem;
  }

  .game-info {
    font-size: 2.2rem;
    padding: 0.4rem;
  }

  .pc >>> .board-info .name,
  .pl >>> .board-info .name {
    font-size: 2rem;
  }
}

@media screen and (max-width: 1280px) {
  .game-container {
    padding: 1rem;
    display: grid;
    grid-auto-columns: auto auto;
    grid-auto-rows: auto auto;
  }

  .game-info {
    grid-column: 1 / 3;
    order: -1;
  }

}

@media screen and (max-width: 1000px) {
  .pc >>> .spot .ship {
    grid-gap: 2px;
  }

  .pc >>> .spot .part,
  .pl >>> .spot .part {
    line-height: 0.7;
  }

  .game-info {
    order: 0;
  }

  .game-container {
    justify-content: center;
  }
}

@media screen and (max-width: 820px) {
  .game-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 359px) {
  .pc >>> .spot .ship {
    grid-gap: 1px;
  }

  .pc >>> .spot .part {
    border-width: 1px;
  }

  .pc >>> .spot .part,
  .pl >>> .spot .part {
    line-height: 0.9;
  }
}
</style>
