export default function implementable(fn, defaults){
    return overrides => fn(Object.assign({}, defaults, overrides))
}
