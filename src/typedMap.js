import { extend } from './strictduck'
import { objectContainsOnly } from './resolve'
import { nameClass } from './utils'
import getPrototypeChain from 'get-prototype-chain'

export default function typedMap({
    name, strictduck=StrictDuck
}) {
    return nameClass({
        name: name || `${strictduck.name}Map`,
        Class: class extends extend({name: 'Map'}) {
            constructor(object){
                objectContainsOnly({strictduck, object})
                super(object)
            }
        }
    })
}
