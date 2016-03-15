import StrictDuck from './strictduck'

export default function implement({
    name, withClass, strictduck=StrictDuck
}) {
     name = name || withClass.name || strictduck.name
    let classDict = {}
    classDict[name] = class extends strictduck {
        constructor(...args){
            let implementation = new withClass(...args)
            super(implementation)
        }
    }
    return classDict[name]
}
