const Dragon = require('../dragon')
const { REFRESH_RATE, SECONDS } = require('../config')

const refreshRate = REFRESH_RATE * SECONDS

class Generation {
    constructor(){
        this.accountIds = new Set();
        this.expiration = this.calculateExpartion()
        this.generationId = undefined
    }

    calculateExpartion(){
        const expirationPerion = Math.floor(Math.random() * (refreshRate/2))
        const msUntilExpiration = Math.random() < 0.5 ?
            refreshRate - expirationPerion :
            refreshRate + expirationPerion

        return new Date(Date.now() + msUntilExpiration)
    }

    newDragon({ accountId }){
        if (Date.now() > this.expiration){
            throw new Error(`This Generation expired on ${this.expiration}`)
        }

        if (this.accountIds.has(accountId)) {
            throw new Error('You already have a dragon from this generation');
          }
      
          this.accountIds.add(accountId);

        return new Dragon({ generationId: this.generationId })
    }
}

module.exports = Generation