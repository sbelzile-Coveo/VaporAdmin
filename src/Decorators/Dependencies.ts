// Thanks to Germain Bergeron: http://source.coveo.com/2016/02/04/typescript-injection-decorator/
export const inject = (...keys: string[]) => {
    return (...args: any[]) => {
        var params = [];
        for(var i=0;i<args.length; i++){
            args[i] ? params.push(args[i]) : null;
        }
        switch (params.length) {
            case 2:
                return injectProperty(keys[0]).apply(this, args);
            case 3:
                return injectMethod(...keys).apply(this, args);
            default:
                throw new Error("Decorators are not valid here!");
        }
    };
}

const injectMethod = (...keys: string[]) => {
    return (target: any, key: string, descriptor: any) => {
        var originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            var add = keys.map((key: string) => Dependencies.get(key));
            args = args.concat(add);

            var result = originalMethod.apply(this, args);
            return result;
        };
        return descriptor;
    };
}

export const injectProperty = (...keys: string[]) => {
    return (target: any, property: string) => {
        target[property] = Dependencies.get(keys[0]);
    };
}

export class Dependencies {
    private static dependencies: {[key: string]: any} = {}

    static get(key: string) {
        const registered = Dependencies.dependencies[key];
        if (registered) {
            return registered;
        } else {
            throw new Error(`Error: No '${key}' dependency registered.`);
        }
    }

    static register(key: string, value: any) {
        Dependencies.dependencies[key] = value;
    }
}