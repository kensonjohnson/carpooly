# Feature List (WIP)

## Higher Order Features

- Generate user accounts.
- Each user gets their own dashboard.
- Each user can create or remove carpools.
- Carpool owner can invite other users.

### User Dashboard Features

- Data is organized in the user's dashboard.
- Find/Search for carpools to join.
- View owned carpools.
  - Edit information about the route, including mileage and route.
  - Enter all costs since last bill, including fuel cost, vehicle upkeep, etc.
  - Invite/accept users to join carpool.
  - Enter the daily attendance for each member of the carpool.
  - Generate a report to show who owes what. (invoice, bill, whatever we call it)
- View joined carpools.
  - Check/update attendance.
  - View past bills/payments.
  - View current expected costs.
  - View current accrued costs (estimated).
  - Option to leave carpool.

### UI/UX

- Landing Page
- User Dashboard
- About Page

### App Responsibilities

- CRUD users with authentication.
- Generate bills:
  - allow tracking how many days someone actually rode in a given carpool
  - take in the cost for gas and upkeep
  - produce a "bill" that is proportional to the days a rider actually rode along
