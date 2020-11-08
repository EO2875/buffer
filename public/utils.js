/** Parses a simple String into a Boolean
 * accepts "true", "yes", "1" as `true`
 * and "false", "no", "0" as `false`.
 * If the string cannot be parsed, it will return `null`
 * or throw an error depending on `options`
 *
 * @param {string}  string
 * @param {object}  options
 * @param {boolean} options.returnNull - Can this function return `null`
 *      if the string cannot be parsed?
 * @param {boolean} options.throwErr  - Should this function throw an error
 *      if the string cannot be parsed?
 */
const string2boolean = (string, options) => {
    string = String(string).toLowerCase()

    options = {
        returnNull: true,
        throwErr: false,
        ... options
    }

    let bool = ['true', 'yes', '1'].includes(string) ? true
        :  ['false', 'no', '0'].includes(string) ? false
        : null

    if ( bool == null ){
        if ( ! options.returnNull ){
            bool = false
        } else if ( options.throwErr ){
            throw 'string2bool was fed an illegal string'
        }
    }

    return bool
}
