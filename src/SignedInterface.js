import t from 'tcomb'

const Props = t.dict(t.String, t.Function)

const Options = t.struct({
  name: t.String,
  strict: t.maybe(t.Boolean),
  defaultProps: t.maybe(t.Object)
})

export const signature = Symbol.for('SignedInterface/signature')
export const original = Symbol.for('SignedInterface/original')

function extendSignature(Type, name){
  return [Type.meta[signature], name].join('/')
}

function signedMixin(name){
  return t.struct({
    [signature]: t.refinement(t.String, s => s.startsWith(name))
  }, { defaultProps: { [signature]: name }, name: `Signed${name}` } )
}

function wrapInterface(inter, name){
    let wrapped = inter.extend([signedMixin(name)], { name })
    wrapped.meta[original] = inter
    wrapped.meta[signature] = name
    wrapped.signed = (instance) => instance[signature] && instance[signature].startsWith(name)
    return wrapExtend(wrapped)
}

function wrapExtend(inter){
  let extend = inter.meta[original].extend
  inter.extend = (mixins, options) => {

    let extension = extend(mixins, options)
    let name = extendSignature(inter, t.getTypeName(extension))

    return wrapInterface(extension, name)
  }
  return inter
}

export default function SignedInterface(props, options){
  let inter = t.interface(props, options)
  let name = t.getTypeName(inter)
  return wrapInterface(inter, name)
}

//export default t.func([Props, Options], t.interface).of(SignedInterface)
