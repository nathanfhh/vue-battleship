import { getRandomCoordinate, isCoordinatesValid } from './createGameBoard'
import { getRandomQuestion } from './questionBank'

const getValidName = (name, isPc) => {
  if (!name && !isPc) {
    return 'Player'
  }

  if (!name && isPc) {
    return 'PC-Player'
  }

  return name
}

const playerAttack = ({ player, x, y }) => player.receiveAttack({ x, y })

const tracker = {
  isVertical: null,
  adjacentCoordinates: null,
  backwardCoordinate: null,
  forwardCoordinate: null,
  initialCoordinate: null,
  damagedShipsCoordinates: null,
  isBackWardFirst: null,
}

const pcAttack = ({ player }) => {
  let attackInfo
  let x
  let y

  const makeBackwardAttack = () => {
    ({ x, y } = tracker.backwardCoordinate)

    if (tracker.isVertical) {
      y -= 1

      // eslint-disable-next-line no-loop-func
      if (tracker.damagedShipsCoordinates.find((c) => (c.x === x && c.y === y))) {
        y -= 1
      }
    } else {
      x -= 1

      // eslint-disable-next-line no-loop-func
      if (tracker.damagedShipsCoordinates.find((c) => (c.x === x && c.y === y))) {
        x -= 1
      }
    }

    if (isCoordinatesValid({ x, y })) {
      tracker.backwardCoordinate = { x, y }
      attackInfo = player.receiveAttack({ x, y })

      if (attackInfo === true) {
        tracker.damagedShipsCoordinates.push({ x, y })
      }
    } else {
      tracker.backwardCoordinate = null
      attackInfo = '*'
    }

    if (attackInfo === '*' || attackInfo === false) {
      tracker.backwardCoordinate = null
    }
  }

  const makeForwardAttack = () => {
    ({ x, y } = tracker.forwardCoordinate)

    if (tracker.isVertical) {
      y += 1

      // eslint-disable-next-line no-loop-func
      if (tracker.damagedShipsCoordinates.find((c) => (c.x === x && c.y === y))) {
        y += 1
      }
    } else {
      x += 1

      // eslint-disable-next-line no-loop-func
      if (tracker.damagedShipsCoordinates.find((c) => (c.x === x && c.y === y))) {
        x += 1
      }
    }

    if (isCoordinatesValid({ x, y })) {
      tracker.forwardCoordinate = { x, y }
      attackInfo = player.receiveAttack({ x, y })

      if (attackInfo === true) {
        tracker.damagedShipsCoordinates.push({ x, y })
      }
    } else {
      tracker.forwardCoordinate = null
      attackInfo = '*'
    }

    if (attackInfo === '*' || attackInfo === false) {
      tracker.forwardCoordinate = null
    }
  }

  do {
    if (tracker.adjacentCoordinates) {
      const random = Math.floor(Math.random() * tracker.adjacentCoordinates.length);
      ({ x, y } = tracker.adjacentCoordinates[random])
      attackInfo = player.receiveAttack({ x, y })

      if (attackInfo === true) {
        tracker.isVertical = tracker.initialCoordinate.y !== y
        const { initialCoordinate } = tracker

        tracker.backwardCoordinate = { ...initialCoordinate }
        tracker.forwardCoordinate = { ...initialCoordinate }
        tracker.isBackWardFirst = Math.floor(Math.random() * 2) === 1

        tracker.damagedShipsCoordinates.push({ x, y })
        tracker.adjacentCoordinates = null
      }
    } else if (tracker.backwardCoordinate && (tracker.isBackWardFirst || !tracker.forwardCoordinate)) {
      makeBackwardAttack()
    } else if (tracker.forwardCoordinate && (!tracker.isBackWardFirst || !tracker.backwardCoordinate)) {
      makeForwardAttack()
    } else {
      x = getRandomCoordinate()
      y = getRandomCoordinate()
      attackInfo = player.receiveAttack({ x, y })
    }
  } while (attackInfo === '*')

  if (attackInfo === true
    && !tracker.backwardCoordinate
    && !tracker.forwardCoordinate
    && !tracker.adjacentCoordinates
  ) {
    tracker.initialCoordinate = { x, y }
    tracker.damagedShipsCoordinates = []
    tracker.adjacentCoordinates = []
    tracker.damagedShipsCoordinates.push({ x, y })

    if (isCoordinatesValid({ x: x - 1, y })) {
      tracker.adjacentCoordinates.push({ x: x - 1, y })
    }

    if (isCoordinatesValid({ x: x + 1, y })) {
      tracker.adjacentCoordinates.push({ x: x + 1, y })
    }

    if (isCoordinatesValid({ x, y: y - 1 })) {
      tracker.adjacentCoordinates.push({ x, y: y - 1 })
    }

    if (isCoordinatesValid({ x, y: y + 1 })) {
      tracker.adjacentCoordinates.push({ x, y: y + 1 })
    }
  }

  if (attackInfo.damagedShipData) {
    tracker.isVertical = null
    tracker.adjacentCoordinates = null
    tracker.backwardCoordinate = null
    tracker.forwardCoordinate = null
    tracker.initialCoordinate = null
    tracker.damagedShipsCoordinates = null
    tracker.isBackWardFirst = null
  }

  return { attackInfo, cord: { x, y } }
}

const answerQuestion = () => {
  const question = getRandomQuestion()
  const correctness = localStorage.getItem('pcCorrectness') || 0.6
  const isCorrect = Math.random() < correctness
  return { question, isCorrect }
}

const createPlayer = ({ name = '', board, isPc = false } = {}) => {
  if (!board) throw new Error('Player must have a board')
  if (!board.isReady()) throw new Error('Player must have a board with ships')

  const playerName = getValidName(name, isPc)
  const receiveAttack = board.receiveAttack.bind(board)
  const attack = isPc ? pcAttack : playerAttack

  return {
    getName: () => playerName,
    getBoard: () => ({ ...board }),
    attack,
    receiveAttack,
    answerQuestion,
  }
}

export default createPlayer
