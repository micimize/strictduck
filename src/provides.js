import bottle from 'bottlejs'
import StrictDuck from './strictduck'
import resolve from './resolve'
import { nameClass } from './utils'

export default function provides({
    name, provider,
    parent = StrictDuck,
    dependencies=[]
}) {
    return nameClass({
        name: name || parent.name,
        Class: class extends parent {
            provide({container, ...args}){
                return provider({
                    ...resolve({container, dependencies}),
                    ...args
                })
            }
        }
    })
}
