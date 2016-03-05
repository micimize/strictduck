import Duckface from 'Duckface/src/duckface'

export function shouldImplement({
    name = 'strictduckInterface', methods = []
}){
    let face = new Duckface(name, methods);
    return instance => Duckface.ensureImplements(instance, face)
}

export default class StrictDuck {
    constructor(instance, ...interfaces){
        Object.assign(this, instance)
        interfaces.forEach(
            i => typeof(i == 'function') ?
                i(this) :
                shouldImplement(i)(this)
        )
    }
}

export function extension({
    name, parent=StrictDuck, interfaces=[]
}){
    let classDict = {}
    classDict[name] = class extends parent {
        constructor(instance, ...otherInterfaces){
            super(instance, ...interfaces, ...otherInterfaces)
        }
    }
    return classDict[name]
}
