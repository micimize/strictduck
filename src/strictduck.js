import getPrototypeChain from 'get-prototype-chain'
import Duckface from 'Duckface/src/duckface'
import { nameClass, nameObj, completeAssignToThis } from './utils'

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
        let hack = typeof(instance) == 'function' ? function(){} : new Object()
        Object.setPrototypeOf(hack, Object.getPrototypeOf(this))
        completeAssignToThis.bind(hack)(instance)
        interfaces.forEach(
            i => typeof(i) == 'function' ?
                i(hack) :
                shouldImplement(i)(hack)
        )
        return nameObj({
            name: firstToLowerCase(Object.getPrototypeOf(this).constructor.name),
            object: hack
        })
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
