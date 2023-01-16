import { Backpack, User } from "./User.js"

const user1 = new User(
  '1',
  'John',
  'Smith',
  'jsmith',
  'jsmith@gmail.com',
  ['a01', 'b01'],
  ['a03'],
  ['cc_visa', 'stripe']
)

// John, Susan, Hiro, Keisha

const user2 = new User(
  '2',
  'Susan',
  'Strong',
  'suestrong',
  'suestrong@gmail.com',
  ['a01', 'b01'],
  ['a03'],
  ['cc_visa']
)

const user3 = new User(
  '3',
  'Hiro',
  'Nakamoto',
  'hironak',
  'hiro1969@gmail.com',
  ['a01', 'b01'],
  ['a03'],
  ['stripe', 'cash']
)

const user4 = new User(
  '4',
  'Keisha',
  'Johnson',
  'keishaj77',
  'keishaj77@protonmail.com',
  ['a01', 'b01'],
  ['a03'],
  ['cc_visa', 'stripe']
)

const users = [user1, user2, user3, user4]

function reportUserData(usersArr) {

  usersArr.forEach((user, i) => {

    const fullName = `${user.firstName} ${user.lastName}`
    console.log(`DATA FOR USER: ${fullName}\n`)

    printObjectProperties(user)

    console.log('\n\n*******************************\n')

  })

}
reportUserData(users)


function printObjectProperties(obj) {

  const arrayProperties = ['carpoolsOwned', 'carpoolsJoined', 'paymentMethods']

  for (const [key, val] of Object.entries(obj)) {
    if (!(arrayProperties.includes(key))) {
      console.log(`${key}: ${val}`)
    } else {
      console.log(`${key}:`)
      console.table(val)
      console.log(`length: ${val.length}`)

    }
  }
}