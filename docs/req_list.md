# Functionality Breakdown (WIP)

## User Flow

### What are the steps in the user registration/sign-up process?

When a user visits the homepage:

1. User will be taken to the landing page.
2. Somewhere on the landing page, there is a "Sign Up" button.
3. Clicking the button will take them to a Sign Up / Login page.
4. User will generate an account by providing:  
    - Chosen UserName (screenName)  
    - Password  
    - Email  
    - Full name
5. (Optional) User confirms email address.

### Returning users:

When a returning user visits the homepage:

- If not already logged in (session expired or null):

  1.  User will be taken to the landing page.
  2.  Somewhere on the landing page, there is a "Login" button.
  3.  User is taken to the Sign Up / Login page.
  4.  User logs in using valid UserName/Email and Password.
  5.  User is then taken to their dashboard.

- If already logged in (user session data exists and is valid):
  - User is taken to their dashboard.

### Under what circumstances does a new carpool object get created?

From the user's dashboard, they have an option to create a carpool.
Upon creation, they are the "Owner" of the carpool.
During creation of the carpool, a new Carpool object is created and added to the Carpools array/storage.

### Does every user have their own carpool assigned even if they never intend to be a driver?

No.
Users all have unique IDs associated with there account.
IDs determine if a user is the owner or a member of a carpool.
In this way, the owner of the carpool should be the one handling all of the costs associated with the vehicle, regardless of if they are the driver or not.
e.g. They are buying the gas and paying for the upkeep.

### How are we tracking if a user is owed money or owes money and to whom?

We will have to discuss a formula to handle this.
Weighting values based on attendance is one viable option:

Given a carpool that has a driver and two passengers, and commutes five times in a week:

1. Owner attends the carpool 5 times.
2. Passenger1 attends 4 days.
3. Passenger2 attends 3 days.

Total spent in gas and upkeep is $60.

One method could be to take the total attendance points together, so 5 + 4 + 3 = 12.  
That gives us something to create a ratio with:

1. Owner pays 5/12 of $60, so $25.
2. Passenger1 pays 4/12 of $60, so $20.
3. Passenger2 pays 3/12 of $60, so $15.

Another method puts the burden more on the carpool owner.
Multiply number of possible attendance points times the number of participants, so 5 days times 3 people = 15.  
We use this as our ratio:

1. Passenger1 pays 4/15 of $60, so $16.
2. Passenger2 pays 3/15 of $60, so $12.
3. Owner takes all of the remaining points and pays 8/15 of $60, so $32.

### What are the step for a user to view "current accrued costs"?

Based on which formula is chosen above, calculate the ratio. Determine an average weekly cost based on previous weeks. Give the user estimated costs based on current attendance.

Take the above example with 3 participants and 5 day carpool: On day three, user checks current accrued cost.  
Well, take average cost of $60 in a week, and a total of 15 possible attendance points.  
Use that to return (3/15) x $60 for a current accrual of $12.

## Possible Objects

```
User {
id: string,                  // use uuidv4 to generate
firstName: string,
lastName: string,
screenName: string,
email: string,
carpoolsOwned: [string],     // this is a set of unique keys
carpoolsJoined: [string],    // this is a set of unique keys
paymentMethods: [Payment],
}
```

```
Payment {
userID: string,
default: boolean,
name: string,               // optional name the user can give to payment method
creditCard: boolean,
nameOnCard: string,
cardNumber: number,
expiration: number,         // something like YYMM
}
```

```
Carpools -> [Carpool]

Carpool {
id: string,                // use uuidv4 to generate
owner: string,             // screenName of the User
members: [string],         // screenName of each member
attendance: [Attendance],
dateLastPayment: Date,
paymentHistory: [PaymentRecord],
}
```

```
Attendance {
user: string,      // userID
count: number,     // (number of days attended since last payout)
days: [Date],
}
```

## Possible Functions

- factory function to generate Users
  - helper functions:
    - update user data
    - create new carpool (Links to the actual function below)
    - edit an owned carpool
    - approve/deny carpool join requests
    - send carpool join requests
    - leave joined carpool
    - view current accrued costs
    - input attendance
    - edit attendance
    - send/generate bill
    - input costs (gas, upkeep)(specific to each carpool)
- function to display stats
  - helper functions:
    - sort data
    - filter data
- function to create new carpool
- function to search for carpools
  - helper functions:
    - sort carpools
    - filter carpools
- function to handle authentication (logging in/out)
