import resolve from './resolve'
import StrictDuck from './strictduck'

export default function depends({
    name, parent=StrictDuck,
    dependencies=[], constructor: c = _=>[_]
}) {
    name = name || parent.name
    let classDict = {}
    classDict[name] = class extends parent {
        constructor({container, ...rest}){
            super(...c({
                ...resolve({container, dependencies}),
                ...rest
            }))
        }
    }
    return classDict[name]
}
