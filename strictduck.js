export default class StrictDuck {
    constructor(instance, ...Interfaces=[]){
        Object.assign(this, instance)
        Interfaces.map(i => i(this))
    }
}
