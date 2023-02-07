class CreditCard {
    constructor(
        user,
        nameOnCard,
        idNumber,
        securityCode,
        expDate,
        pinNumber,
        // bank
    )
    {
        this.user = user
        this.nameOnCard = nameOnCard
        this.idNumber = idNumber
        this.securityCode = securityCode
        this.expDate = expDate
        this.pinNumber = pinNumber
    }
}

export { CreditCard }