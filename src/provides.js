import bottle from 'bottlejs'
import StrictDuck from './strictduck'
import resolve from './resolve'

export default function provides({
    name, provider,
    parent = StrictDuck,
    dependencies=[]
}) {
    name = name || parent.name
    let classDict = {}
    classDict[name] = class extends parent {
        provide({container, ...args}){
            return provider({
                ...resolve({container, dependencies}),
                ...args
            })
        }
    }
    return classDict[name]
}
