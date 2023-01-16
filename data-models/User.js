class Backpack {
  constructor(
    // Define parameters
    name,
    volume,
    color,
    pocketNum,
    strapLengthL,
    strapLengthR,
    lidOpen
  ) {
    // Define properties:
    this.name = name
    this.volume = volume
    this.color = color
    this.pocketNum = pocketNum
    this.strapLength = {
      left: strapLengthL,
      right: strapLengthR,
    }
    this.lidOpen = lidOpen
  }
  // Add methods like normal functions:
  toggleLid(lidStatus) {
    this.lidOpen = lidStatus
  }
  newStrapLength(lengthLeft, lengthRight) {
    this.strapLength.left = lengthLeft
    this.strapLength.right = lengthRight
  }
}

class User {
  constructor(
    id,
    firstName,
    lastName,
    screenName,
    email,
    carpoolsOwned,
    carpoolsJoined,
    payMethods
  )
  {
    // Define properties
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.screenName = screenName
    this.email = email
    this.carpoolsOwned = carpoolsOwned
    this.carpoolsJoined = carpoolsJoined
    this.payMethods = payMethods
  }
  // Define class methods
}

export {Backpack, User}