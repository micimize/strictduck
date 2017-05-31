import t from 'tcomb'
import SignedInterface from './SignedInterface'

export default const StrictDuck = SignedInterface({}, { name: 'StrictDuck' })

export const Main = StrictDuck.extend({call: t.Function}, { name: 'Main' })
