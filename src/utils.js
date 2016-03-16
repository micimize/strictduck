export function completeAssignToThis(source) {
    this.__proto__ = source.__proto__
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
        descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
        return descriptors;
    }, {});
    // by default, Object.assign copies enumerable Symbols too
    Object.getOwnPropertySymbols(source).forEach(sym => {
        let descriptor = Object.getOwnPropertyDescriptor(source, sym);
        if (descriptor.enumerable) {
            descriptors[sym] = descriptor;
        }
    });
    Object.defineProperties(this, descriptors);
}

export function nameClass({name, Class}){
    let classDict = {}
    classDict[name] = Class
    Object.defineProperty(classDict[name], 'name', {value: name})
    return classDict[name]
}
