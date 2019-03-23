/**
 * Returns true if the password is valid and false otherwise
 * @param {String} password
 */
export const validatePassword = function(password) {
    if (password.length < 8) {
        return false;
    }
    const regexes = [
        /[A-Z]+/,
        /[a-z]+/,
        /[0-9]+/,
        /[.\-!@#$%^&*?_+ ]+/
    ];
    for (let i in regexes) {
        let match = password.match(regexes[i]);
        let count = 0;
        while (match !== null) {
            password = password.replace(match[0], '');
            match = password.match(regexes[i]);
            count++;
        }
        if (count === 0) {
            return false;
        }
    }
    return password.length === 0;
};

/**
 * Returns true if the email is valid and false otherwise
 * @param {String} email
 */
export const validateEmail = function(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
};

/**
 * Temporarily sets the value corresponding to the key `key` on `component` to
 * `tempValue`, and returs it to its original value, or `resetValue` if it is
 * defined.
 * @param {Object} component
 * @param {String} key
 * @param {*} tempValue
 * @param {*} resetValue
 */
export const tempSetState = function (component, key, tempValue, resetValue) {
    const oldValue = component.state[key];
    component.setState({ [key]: tempValue });
    setTimeout(() => {
        component.setState({[key]: resetValue || oldValue});
    }, 2500);
};
