const MAX_LENGTH = 4
const MIN_LENGTH = 1

const trimLength = (length) => {
  if (length > MAX_LENGTH) return MAX_LENGTH
  if (length < MIN_LENGTH) return MIN_LENGTH

  return length
}

const isBetweenRange = (position) => MIN_LENGTH <= position && position <= MAX_LENGTH

const createShip = ({ length }) => {
  const hitPositions = []
  const shipLength = trimLength(length)

  return {
    getLength: () => shipLength,

    getHitPositions: () => [...hitPositions],

    isSunk: () => hitPositions.join('').length === shipLength,

    hitAt({ position }) {
      if (isBetweenRange(position)) {
        hitPositions[position - 1] = 'x'
      }

      return this
    },
  }
}

export default createShip
