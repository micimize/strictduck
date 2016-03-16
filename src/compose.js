import Bottle from 'bottlejs'
import getPrototypeChain from 'get-prototype-chain'
import depends, { findSatisfier } from './depends'
import implement from './implement'
import StrictDuck, { Main } from './strictduck'

class Composit extends StrictDuck {
    constructor(...services){
        super(
            services.reduce(
                (context, service) => {
                    console.log(service)
                    context.factory(
                        service.constructor.name,
                        depends({context, service})
                    )
                    return context
                }
                , new Bottle()
            )
         )
         this.main = findSatisfier({ this, Main }).main
    }
}
export default implement({ strictduck: Main, withClass: Composit })
