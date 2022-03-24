import Quality from './Quality';

type ValidateFunction = (q: Quality) => boolean;

export default class QualityValidator {
    validate(quality: Quality): boolean {
        let result: boolean = false;
        for (const fn of Object.keys(this)) {
            if (typeof fn === 'function' && (fn as Function).name.startsWith('validate')) {
                result = result && (fn as ValidateFunction)(quality);
            }
        }
        return result;
    }

    validateId(quality: Quality): boolean {
        return !!quality.id;
    }
}
