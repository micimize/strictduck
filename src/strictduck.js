import Duckface from 'Duckface/src/duckface'
import { id, nameClass, nameObj, completeAssignToThis } from './utils'

export function shouldImplement({
    name = 'strictduckInterface', methods = []
}){
    let face = new Duckface(name, methods);
    return instance => Duckface.ensureImplements(instance, face)
}

function firstToLowerCase( str ) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

export default class StrictDuck {
    constructor(instance, ...interfaces){
        let copy = typeof(instance) == 'function' ? function(){} : new Object()
        Object.setPrototypeOf(copy, Object.getPrototypeOf(this))
        completeAssignToThis.bind(copy)(instance)
        interfaces.forEach(
            i => typeof(i) == 'function' ?
                i(copy) :
                shouldImplement(i)(copy)
        )
        return nameObj({
            name: firstToLowerCase(Object.getPrototypeOf(this).constructor.name),
            object: copy
        })
    }
}

StrictDuck[id] = Symbol('StrictDuck')

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
