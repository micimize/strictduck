import getPrototypeChain from 'get-prototype-chain'
import extend from 'proto-extend'

export const id = Symbol('strictduck.id')

export function equals(duckA, duckB){
    return duckA[id] && duckB[id] && duckA[id] == duckB[id]
}

function extendFromBase(objProto, baseProto){
    if(Object.getPrototypeOf(objProto) == null || getPrototypeChain(baseProto).indexOf(objProto) > -1){
        return baseProto
    } else {
        Object.setPrototypeOf(objProto, extendFromBase(objProto.__proto__, baseProto))
        return objProto
    }
}
function extendThisFromBase(base){
    if (Object.getPrototypeOf(this) != null) {
        Object.setPrototypeOf(this, extendFromBase(Object.getPrototypeOf(this), Object.getPrototypeOf(base)))
    } else {
        Object.setPrototypeOf(this, Object.getPrototypeOf(base))
    }
}

export function completeAssignToThis(source) {
    extendThisFromBase.bind(this)(source)
    let descriptors = Object.getOwnPropertyNames(source).reduce((descriptors, key) => {
        if (key != 'constructor')
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
        return descriptors;
    }, {});
    // by default, Object.assign copies enumerable Symbols too
    Object.getOwnPropertySymbols(source).forEach(sym => {
        let descriptor = Object.getOwnPropertyDescriptor(source, sym);
        if (descriptor.enumerable) {
            descriptors[sym] = descriptor;
        }
    });
    Object.defineProperties(this, descriptors);
}

export function nameObj({name, object}){
    let dict = {}
    dict[name] = object
    Object.defineProperty(dict[name], 'name', {
        configurable: true, value: name
    })
    return dict[name]
}

export function nameClass({name, Class, idSymbol = id}){
    Class[idSymbol] = Symbol(name)
    return nameObj({name, object: Class})
}
