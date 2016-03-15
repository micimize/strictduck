import Duckface from 'Duckface/src/duckface'
import completeAssignToThis from './completeAssign'

export function shouldImplement({
    name = 'strictduckInterface', methods = []
}){
    let face = new Duckface(name, methods);
    return instance => Duckface.ensureImplements(instance, face)
}

export default class StrictDuck {
    constructor(instance, ...interfaces){
        completeAssignToThis.bind(this)(instance)
        interfaces.forEach(
            i => typeof(i) == 'function' ?
                i(this) :
                shouldImplement(i)(this)
        )
    }
}

export function extend({
    name, parent=StrictDuck, interfaces=[], methods=[]
}){
    let classDict = {}
    classDict[name] = class extends parent {
        constructor(instance, ...otherInterfaces){
            super(
                instance, {name, methods},
                ...interfaces, ...otherInterfaces
            )
        }
    }
    return classDict[name]
}

export const Main = extend({ name: 'Main', methods: ['main'] })
