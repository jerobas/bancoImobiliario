export default class Player {
    constructor(amount) {
        this.amount = amount
    }

   add(amount){
    this.amount += amount
   }

   toString(){
    return `Moeda: ${this.amount}`
   }
}