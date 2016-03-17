import getPrototypeChain from 'get-prototype-chain'
import Bottle from 'bottlejs'
import depends from './depends'
import resolve, { findSatisfier } from './resolve'
import implement from './implement'
import StrictDuck, { Main } from './strictduck'

function materializer(service){
    return (typeof(service) == 'function') ?
        (container => console.log(service) || new service({container})) :
        _ => service
}

class Composit extends StrictDuck {
    constructor({main: {Class: mainClass = Main, method: mainMethod = 'main'}}, ...services){
        let providerMap = {}
        super(
            services.reduce(
                (context, service) => {
                    let name = service.name || service.constructor.name
                    providerMap[name] = service
                    context.factory(name, materializer(service))
                    return context
                }
                , new Bottle()
            )
         )
         this.value('providers', providerMap)
         let mainSatisfier = findSatisfier({ container: this.container, dependency: mainClass })
         this.main = (kwargs, ...args) => mainSatisfier[mainMethod]({container: this.container, ...kwargs}, ...args)
    }
}

export default implement({ strictduck: Main, withClass: Composit })
