import getPrototypeChain from 'get-prototype-chain'

export function satisfies({provider, dependency}){
    return getPrototypeChain(provider)
        .filter(p => p == dependency || p instanceof dependency || p.constructor.name == dependency).length > 0
}

export function findSatisfier({container, dependency}){
    let satisfierArr = Object.keys(container.providers).filter(key => satisfies({provider: container.providers[key], dependency}))
    let satisfier = satisfierArr.length && satisfierArr[0]
    return satisfier ? container[satisfier] : Error(`${dependency.name} is unsatsified!`)
}

export default function resolve({container, dependencies}){
    return dependencies.reduce(
        (resolved, dependency) => {
        resolved[dependency.name || dependency.constructor.name] = findSatisfier({
            container,
            dependency
        })
        return resolved
    }, {})
}

export function objectContainsOnly({strictduck, object}){
    return Object.keys(object).filter(
        k => !satisfies({ provider: object[k], dependency: strictduck })
    ).length == 0
}
