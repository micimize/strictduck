import bottle from 'bottlejs'
import StrictDuck, { extend } from './strictduck'
import implement from './implement'
import resolve from './resolve'
import { nameClass } from './utils'

export const Provider = extend({ name: 'Provider', methods: ['provide'] })

export default function provides({
    name, provider,
    parent = StrictDuck,
    dependencies=[]
}) {
    return nameClass({
        name: name || parent.name,
        Class: class extends parent {
            constructor(...args){
                super(...args)
                this.provide = function provide({container, ...kwargs}, ...pargs){
                    return provider.bind(this)({
                        ...resolve({container, dependencies}),
                        ...kwargs
                    }, ...pargs)
                }.bind(this)
            }
        }
    })
}
