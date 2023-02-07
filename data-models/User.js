class User {
  constructor(
    id,
    firstName,
    lastName,
    displayName,
    email,
    carpoolsOwned,
    carpoolsJoined,
    payMethods
  )
  {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.displayName = displayName
    this.email = email
    this.carpoolsOwned = carpoolsOwned
    this.carpoolsJoined = carpoolsJoined
    this.payMethods = payMethods
  }
}

export { User }