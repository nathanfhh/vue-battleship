<template>
  <v-dialog v-model="dialogVisible" persistent overlay-opacity="0.8">
    <div class="container">
      <h2>Arrange your board</h2>
      <div class="redactor">
        <div class="board-container">
          <div class="cords letters">
            <div class="letter" v-for="l in lettersCords" :key="l">{{ l }}</div>
          </div>
          <div class="cords numbers">
            <div class="number" v-for="n in numbersCords" :key="n">{{ n }}</div>
          </div>
          <div class="board">
            <div
                class="spot"
                v-for="(_, i) in Math.pow(MAX + 1, 2)"
                :key="keys[i]"
                :data-cord="stringifiedCords[i]"
                @dragover.prevent="handleDragOver"
                @dragleave="handleDragLeave"
                @drop.prevent="handleDrop"
            ></div>
          </div>
        </div>
        <div class="selection">
          <div
              class="ship-container"
              v-for="(count, ship) in ships"
              :key="ship"
              @dragstart="handleDragStart"
          >
            <span class="count">{{ count }}x</span>
            <div
                class="ship"
                :data-length="getShipLength(ship)"
                data-position="y"
                draggable="true"
                :ref="el => (shipRefs[ship] = el)"
            >
              <div class="part" v-for="i in getShipLength(ship)" :key="i"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="tips-container">
        <v-icon class="tip-ico">mdi-lightbulb-on</v-icon>
        <div class="tips">
          <span>* Drag and drop the ships</span>
          <span>* Click on a ship on the board to switch direction</span>
        </div>
      </div>
      <div class="options">
        <button @click="handleRandomPlacement">Random</button>
        <button @click="resetBoard">Reset</button>
        <button @click="onClickStartBtn" :class="{ disable: totalShips !== 0 }">Start</button>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
import {ref, reactive, computed, watch} from 'vue';
import createGameBoard, {
  MAX_CORD_RANGE,
  MIN_CORD_RANGE,
  REQUIRED_TYPES_OF_SHIPS,
} from '../scripts/createGameBoard';
import createShip from '../scripts/createShip';

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['start-game', 'update:isOpen']);

const MAX = MAX_CORD_RANGE;
const MIN = MIN_CORD_RANGE;

const ships = reactive({...REQUIRED_TYPES_OF_SHIPS});
const board = ref(createGameBoard());
const draggedShip = ref(null);
const shipRefs = reactive({});

const dialogVisible = ref(props.isOpen);

watch(
    () => props.isOpen,
    (newVal) => {
      dialogVisible.value = newVal;
      if (newVal) {
        resetBoard();
      }
    },
    {immediate: true}
);

watch(
    () => dialogVisible.value,
    (newVal) => {
      if (newVal !== props.isOpen) {
        emit('update:isOpen', newVal);
      }
    }
);

const cords = computed(() => {
  const cordsArray = [];
  for (let i = MIN; i <= MAX; i += 1) {
    for (let j = MIN; j <= MAX; j += 1) {
      cordsArray.push({x: j, y: i});
    }
  }
  return cordsArray;
});

const keys = computed(() => cords.value.map((c, i) => `${JSON.stringify(c)}-${i}`));

const stringifiedCords = computed(() => cords.value.map((c) => JSON.stringify(c)));

const lettersCords = computed(() => {
  const cordsArray = [];
  for (let i = MIN; i <= MAX; i += 1) {
    cordsArray.push(String.fromCharCode(65 + i));
  }
  return cordsArray;
});

const numbersCords = computed(() => {
  const cordsArray = [];
  for (let i = MIN + 1; i <= MAX + 1; i += 1) {
    cordsArray.push(i);
  }
  return cordsArray;
});

const totalShips = computed(() => {
  return Object.values(ships).reduce((prev, cur) => prev + cur, 0);
});

function getShipLength(ship) {
  return Number(ship.match(/\d+/)[0]);
}

function resetBoard() {
  document.querySelectorAll('.spot > .ship').forEach((ship) => ship.remove());
  board.value = createGameBoard();
  Object.assign(ships, {...REQUIRED_TYPES_OF_SHIPS});
}

function onClickStartBtn() {
  const plBoardElement = document.querySelector('.board-container').cloneNode(true);
  const shipsEls = plBoardElement.querySelectorAll('.ship');
  console.log("plBoardElement", plBoardElement, typeof plBoardElement);
  shipsEls.forEach((ship) => {
    ship.removeAttribute('draggable');
    const isVertical = ship.dataset.position === 'x';
    const {x, y} = JSON.parse(ship.parentElement.dataset.cord);

    ship.querySelectorAll('.part').forEach((part, i) => {
      const curCord = isVertical ? {x, y: y + i} : {x: x + i, y};
      part.dataset.cord = JSON.stringify(curCord);
    });
  });

  board.value.setBoardToReady();
  const plBoard = {...board.value};

  resetBoard();
  const pcBoardElement = document.querySelector('.board-container').cloneNode(true);

  [4, 3, 3, 2, 2, 2, 1, 1, 1, 1].forEach((length) => {
    board.value.placeShipRandom(createShip({length}));
  });

  board.value.setBoardToReady();
  const pcBoard = {...board.value};
  emit('start-game', plBoard, plBoardElement, pcBoard, pcBoardElement);
}

function handleChangePosition(e) {
  const ship = e.currentTarget;
  const cord = JSON.parse(ship.dataset.cord);
  const isVertical = ship.dataset.position === 'x';

  if (
      board.value.replaceShipFrom(
          {cx: cord.x, cy: cord.y},
          {nx: cord.x, ny: cord.y, isVertical: !isVertical}
      )
  ) {
    const pos = ship.dataset.position === 'x' ? 'y' : 'x';
    ship.dataset.position = pos;
    ship.style['grid-auto-flow'] = pos === 'x' ? 'row' : 'column';
  }
}

function handleShipInitialCord(e) {
  const cord = JSON.parse(e.currentTarget.dataset.cord);
  const {position} = e.currentTarget.dataset;
  e.dataTransfer.setData('text/plain', JSON.stringify({cord, cloned: true, position}));
  draggedShip.value = e.currentTarget;
}

function handleDragStart(e) {
  const {position} = e.target.dataset;
  const length = +e.target.dataset.length;
  e.dataTransfer.setData('text/plain', JSON.stringify({length, position}));
}

function handleDragOver(e) {
  e.target.classList.add('over');
}

function handleDragLeave(e) {
  e.target.classList.remove('over');
}

function handleDrop(e) {
  e.target.classList.remove('over');

  let isDataValid;
  let data;

  try {
    data = JSON.parse(e.dataTransfer.getData('text/plain'));
    JSON.parse(e.target.dataset.cord);
    isDataValid = true;
  } catch {
    isDataValid = false;
  }

  if (isDataValid && data) {
    if (data.cloned) {
      const newCord = JSON.parse(e.target.dataset.cord);
      const {cord, position} = data;
      const isVertical = position === 'x';

      if (
          board.value.replaceShipFrom(
              {cx: cord.x, cy: cord.y},
              {nx: newCord.x, ny: newCord.y, isVertical}
          )
      ) {
        draggedShip.value.dataset.cord = e.target.dataset.cord;
        e.target.appendChild(draggedShip.value);
        draggedShip.value = null;
      }
    } else {
      const {length, position} = data;
      const cord = JSON.parse(e.target.dataset.cord);
      const isVertical = position === 'x';

      if (board.value.placeShipAt(createShip({length}), {...cord, isVertical})) {
        const shipType = `ship${length}`;
        const ship = shipRefs[shipType].cloneNode(true);

        ship.dataset.cord = e.target.dataset.cord;
        ship.dataset.position = position;

        ships[shipType] -= 1;

        ship.style.position = 'absolute';
        e.target.appendChild(ship);

        ship.addEventListener('dragstart', handleShipInitialCord);
        ship.addEventListener('click', handleChangePosition);
      }
    }
  }
}

function handleRandomPlacement() {
  function renderNewShip({x, y, isVertical}, length) {
    const shipType = `ship${length}`;
    const ship = shipRefs[shipType].cloneNode(true);

    ship.dataset.cord = JSON.stringify({x, y});
    ship.dataset.position = isVertical ? 'x' : 'y';

    ships[shipType] -= 1;
    ship.style.position = 'absolute';
    ship.style['grid-auto-flow'] = isVertical ? 'row' : 'column';

    const spot = [...document.querySelectorAll('.spot')].find(
        (spot) => spot.dataset.cord === JSON.stringify({x, y})
    );

    spot.appendChild(ship);

    ship.addEventListener('dragstart', handleShipInitialCord);
    ship.addEventListener('click', handleChangePosition);
  }

  resetBoard();

  [4, 3, 3, 2, 2, 2, 1, 1, 1, 1].forEach((length) => {
    const shipPlacement = board.value.placeShipRandom(createShip({length}));
    renderNewShip(shipPlacement, length);
  });
}
</script>

<style scoped>
.container {
  font-family: bfont;
  min-width: 100%;
  background-color: rgba(34, 34, 34, 0.8);
  box-shadow: inset 0 0 2px 2px rgb(56, 56, 56);
}

.container h2 {
  font-size: 3.2rem;
  text-shadow: 0 2px 2px black;
  text-align: right;
  text-decoration: underline;
}

.options {
  display: flex;
  justify-content: space-around;
}

.options button {
  font-size: 3.2rem;
  text-shadow: 0 2px 2px black;
  text-align: center;
  outline: none;
}

.options button:hover,
.options button:focus {
  color: rgb(128, 255, 0);
}

.redactor {
  --spot-size: 4rem;
  display: flex;
  justify-content: space-evenly;
}

.cords {
  display: grid;
  text-shadow: 0 2px 2px black;
  font-size: 1.8rem;
}

.letters {
  justify-content: space-evenly;
  grid-template-columns: repeat(10, var(--spot-size));
  grid-column: 2 / 3;
}

.numbers {
  grid-template-rows: repeat(10, var(--spot-size));
  align-content: space-evenly;
}

.letter,
.number {
  width: var(--spot-size);
  height: var(--spot-size);
  display: flex;
  justify-content: center;
  align-items: center;
}

.board-container {
  display: grid;
  grid-template: var(--spot-size) 1fr / var(--spot-size) 1fr;
}

.board {
  display: grid;
  grid-template-columns: repeat(10, var(--spot-size));
  grid-gap: 4px;
  border: 4px solid rgb(0, 44, 102);
  background-color: rgb(0, 44, 102);
}

.spot {
  width: var(--spot-size);
  height: var(--spot-size);
  background-color: rgb(35, 137, 218);
  position: relative;
}

.over {
  background-color: rgb(0, 74, 134);
}

.tips-container {
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  font-size: 1.6rem;
  text-shadow: 0 2px 2px black;
  display: flex;
}

.tips {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
}

.tip-ico {
  font-size: 3.6rem;
  color: rgb(255, 255, 0);
  animation: pulse 250ms 3s 6 alternate;
  border-radius: 50%;
}

@keyframes pulse {
  100% {
    transform: scale(1.2);
    color: rgb(200, 48, 48);
    box-shadow: inset 0 0 10px 2px rgb(255, 255, 0),
    0 0 10px 2px rgb(255, 255, 0);
  }
}

.selection {
  padding: 10rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.ship-container {
  display: flex;
  align-items: center;
}

.count {
  font-size: 2.6rem;
  width: 5rem;
}

.ship {
  display: grid;
  grid-auto-flow: column;
  background-color: rgb(128, 128, 128);
  grid-gap: 4px;
  cursor: move;
  z-index: 69;
}

.part {
  width: var(--spot-size);
  height: var(--spot-size);
  background-color: grey;
  border: 4px solid rgb(70, 70, 70);
}

.disable {
  pointer-events: none;
  color: rgb(117, 117, 117);
}

@media screen and (max-width: 860px) {
  .board,
  .ship {
    grid-gap: 2px;
  }

  .board {
    grid-gap: 2px;
    border-width: 2px;
  }
}

@media screen and (max-width: 600px) {
  .ship-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .selection {
    padding: 2rem 0;
  }
}

@media screen and (max-width: 572px) {
  .redactor {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media screen and (max-width: 360px) {
  .board,
  .ship {
    grid-gap: 1px;
  }

  .board {
    grid-gap: 1px;
    border-width: 1px;
  }
}

@media screen and (max-width: 359px) {
  .ship .part {
    border-width: 1px;
  }
}
</style>
