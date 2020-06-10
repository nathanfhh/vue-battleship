const maxShipLength = 4
const minShipLength = 1

const trimLength = (length) => {
  if (length > maxShipLength) return maxShipLength
  if (length < minShipLength) return minShipLength

  return length
}

const isBetweenRange = (position) => minShipLength <= position && position <= maxShipLength

const shipFactory = ({ length }) => {
  const hullDamage = []
  const shipLength = trimLength(length)

  return {
    getLength: () => shipLength,

    getHullDamage: () => [...hullDamage],

    isSunk: () => hullDamage.join('').length === shipLength,

    hit({ position }) {
      if (isBetweenRange(position)) {
        hullDamage[position - 1] = 'x'
      }

      return this
    },
  }
}

export default shipFactory
