function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const rulesHandler = {
    required: (value, rule, fieldName = "") => {
        if (rule === true && ['', undefined, null].some(v => v === value)) {
            return `The ${fieldName} field is required.`;
        }
    },

    minLength: (value, length, fieldName) => {
        if (value && value.length < length) {
            return `The ${fieldName} must be at least ${length} characters.`;
        }
    },

    maxLength: (value, length, fieldName) => {
        if (value && value.length > length) {
            return `The ${fieldName} must be at max ${length} characters.`;
        }
    },

    email: (value, rule) => {
        if (rule === true && !isEmail(String(value))) {
            return 'The email format is invalid.';
        }
    },
};

export function checkValue(value, rules, fieldName) {
    for (const rule in rules) { // eslint-disable-line
        if (!rules.hasOwnProperty(rule)) continue; // eslint-disable-line
        let error = rulesHandler[rule].call(null, value, rules[rule], fieldName);
        if (error) return error;
    }
}

export function checkForm(values, rules) {
    return Object.keys(rules).reduce((result, fieldName) => {
        return {
            ...result,
            [fieldName]: rules[fieldName]['key']
                ? checkValue(values[fieldName][rules[fieldName]['key']], rules[fieldName], fieldName)
                : checkValue(values[fieldName], rules[fieldName], fieldName)
        };
    }, {});
}
