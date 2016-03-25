import resolve from './resolve'
import StrictDuck from './strictduck'
import { nameClass } from './utils'
import getPrototypeChain from 'get-prototype-chain'

export default function depends({
    name, parent=StrictDuck,
    dependencies=[], constructor: c = (...args) => args
}) {
    return nameClass({
        name: name || parent.name,
        Class: class extends parent {
            constructor({container, ...rest}){
                super(...c({
                    ...resolve({container, dependencies}),
                    ...rest,
                    container
                }))
            }
        }
    })
}
