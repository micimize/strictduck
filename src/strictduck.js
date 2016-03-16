import Duckface from 'Duckface/src/duckface'
import { nameClass, completeAssignToThis } from './utils'

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
    return nameClass({
        name: name || parent.name,
        Class: class extends parent {
            constructor(instance, ...otherInterfaces){
                super(
                    instance, {name, methods},
                    ...interfaces, ...otherInterfaces
                )
            }
        }
    })
}

export const Main = extend({ name: 'Main', methods: ['main'] })
