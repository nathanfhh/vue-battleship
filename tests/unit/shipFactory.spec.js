import shipFactory from '@/scripts/shipFactory'

describe('shipFactory', () => {
  it('create a ship with length 3', () => {
    expect(shipFactory({ length: 3 }).getLength()).toBe(3)
  })

  it('return length = 4 if provided length > 4', () => {
    expect(shipFactory({ length: 8 }).getLength()).toBe(4)
  })

  it('return length = 1 if provided length < 1', () => {
    expect(shipFactory({ length: -23 }).getLength()).toBe(1)
  })

  it('new created ship should not be sunk', () => {
    expect(shipFactory({ length: 3 }).isSunk()).toBe(false)
  })

  it('ship is sunk if the ship was destroyed', () => {
    expect(
      shipFactory({ length: 1 })
        .hit({ position: 1 })
        .isSunk(),
    ).toBe(true)
  })

  it('ship is not hit if position provided is too big or small', () => {
    const ship = shipFactory({ length: 1 })

    expect(
      ship
        .hit(40)
        .getHullDamage()
        .join(''),
    ).toBe('')
    expect(
      ship
        .hit(0)
        .getHullDamage()
        .join(''),
    ).toBe('')
  })

  it('a ship with 1 or health is not sunk', () => {
    const ship = shipFactory({ length: 4 })

    expect(ship.isSunk()).toBe(false)
    expect(ship.hit({ position: 1 }).isSunk()).toBe(false)
    expect(ship.hit({ position: 3 }).isSunk()).toBe(false)
    expect(ship.hit({ position: 2 }).isSunk()).toBe(false)
    expect(ship.hit({ position: 4 }).isSunk()).toBe(true)
  })

  it('alive ship has empty or undefined values in its hullDamage array', () => {
    expect(
      shipFactory({ length: 3 })
        .hit({ position: 2 })
        .getHullDamage()[0],
    ).toBeFalsy()
  })

  it('return an empty array if the ship has no damage', () => {
    expect(
      shipFactory({ length: 3 })
        .getHullDamage()
        .join(''),
    ).toBe('')
  })

  it('return an array full of x equal with ship length if it was sunk', () => {
    const ship = shipFactory({ length: 2 })
    
    expect(
      ship
        .hit({ position: 2 })
        .getHullDamage()
        .join(''),
    ).toBe('x')

    expect(
      ship
        .hit({ position: 1 })
        .getHullDamage()
        .join(''),
    ).toBe('xx')

    expect(ship.getHullDamage().join('').length).toBe(ship.getLength())
  })
})
