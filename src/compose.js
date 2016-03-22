import getPrototypeChain from 'get-prototype-chain'
import Bottle from 'bottlejs'
import depends from './depends'
import resolve, { findSatisfier } from './resolve'
import implement from './implement'
import StrictDuck, { Main } from './strictduck'

function materializer(service){
    return (container => new service({container})) 
}

class Composit extends StrictDuck {
    constructor({main: {Class: mainClass = Main, method: mainMethod = 'main'}}, ...services){
        let providerMap = {}
        super(
            services.reduce(
                (context, {dependency, provider}) => {
                    let name = provider.name || provider.constructor.name
                    providerMap[name] = provider
                    if(provider instanceof dependency) {
                        context.value(name, provider)
                    } else {
                        context.factory(name, materializer(provider))
                    }
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
