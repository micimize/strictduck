import getPrototypeChain from 'get-prototype-chain'

export function satisfies({provider, dependency}){
    return getPrototypeChain(provider)
        .filter(p => p == dependency || p instanceof dependency || p.constructor.name == dependency).length > 0
}

export function findSatisfier({container, dependency}){
    let providers = Object.values(container)
    let satisfierArr = providers.filter(provider => satisfies({provider, dependency}))
    let satisfier = satisfierArr.length && satisfierArr[0]
    return satisfier || Error(`${dependency} is unsatsified!`)
}

export default function resolve({container, dependencies}){
    return dependencies.reduce(
        (resolved, dependency) => {
        resolved[dependency] = findSatisfier({
            container,
            dependency
        })
        return resolved
    }, {})
}
