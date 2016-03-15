import Bottle from 'bottlejs'
import getPrototypeChain from 'get-prototype-chain'
import depends, { findSatisfier } from './depends'
import { Main } from './strictduck'

function compose(...services){
    return services.reduce(
        (context, service) => {
            context.factory(
                service.name,
                depends({context, service})
            )
            return context
        }
    , new Bottle())
}

export default function composit({
     name, types=[], parent=Main, constructor: c = _=>[_]
}) {
    name = name || parent.name
    let classDict = {}
    classDict[name] = class extends Main {
        constructor(...args){
            super(compose(...c(...args)))
            this.main = findSatisfier({ this, Main }).main
        }
    }
    return classDict[name]
}
