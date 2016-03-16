import StrictDuck from './strictduck'
import { nameClass } from './utils'

export default function implement({
    name, withClass, strictduck=StrictDuck
}) {
    return nameClass({
        name: name || withClass.name || strictduck.name,
        Class: class extends strictduck {
            constructor(...args){
                let implementation = new withClass(...args)
                super(implementation)
            }
        }
    })
}
