function regexpTag(tag) { return new RegExp("<("+tag+")\\b[^>]*>([\\s\\S]*?)<\\/\\1>","gi");};

const rTags = /<\/?([a-z]\w*)\b[^>]*>/gi;

/**
 * Encodes a string to base64.
 * @param input string to encode
 * @returns {String}
 */
export function base64encode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        (match, p1) => String.fromCharCode('0x' + p1)
    ));
}

/**
 * Decodes a base64 encoded string.
 * @param input string to decode
 * @returns {String}
 */
export function base64decode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

/**
 * Formats a string for transmission via query string
 * @param str string to format
 * @returns {String}
 */
export function urlencode(str) {
    return window.encodeURIComponent(str);
}

/**
 * Decodes a string after transmission via query string
 * @param str string to decode
 * @returns {String}
 */
export function urldecode(str) {
    return window.decodeURIComponent(str);
}

/**
 * Puts the first letter of the string in uppercase
 * @param str string to analyze
 * @returns {String}
 */
export function ucfirst(str) {
    
    return str.charAt(0).toUpperCase() + str.substr(1);
}

/**
 * Puts the first letter of the string in lowercase
 * @param str string to analyze
 * @returns {String}
 */
export function lcfirst(str) {
    
    return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Puts the first letter of each word in uppercase
 * @param str string to analyze
 * @returns {String}
 */
export function ucwords(str) {
    return str.replace(/\b[a-z]/g,function(s){ return s.toUpperCase(); });
}

/**
 * Removes accents from the string
 * @param str string to analyze
 * @returns {String}
 */
export function stripAccents(str) {
    
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g // C, c
    ];
    
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
    
    for(var i = 0; i < accent.length; i++) str = str.replace(accent[i], noaccent[i]);
    
    return str;
}

/**
 * Removes tags from the string
 * @param str string to analyze
 * @param allowed allowed tag. The number of arguments is unlimited.
 * @returns {String}
 * @example JSYG.stripTags('&lt;tata&gt;toto&lt;/tata&gt;','br','span') == 'toto';
 * @see stripTagsR
 */
export function stripTags(str, ...allowed) {
    return str.replaceAll(rTags, (s, s1) => allowed.includes(s1.toLowerCase()) ? s : '');
}

/**
 * Removes tags from the string.
 * Unlike stripTags, this method works with a blacklist rather than a whitelist.
 * @param str string to analyze
 * @param forbidden tag to remove. The number of arguments is unlimited.
 * @returns {String}
 * @see stripTags
 */
export function stripTagsR(str, ...forbidden) {
    return str.replaceAll(rTags, (s, s1) => forbidden.includes(s1.toLowerCase()) ? '' : s);
}

/**
 * Removes attributes from tags
 * @param str string to analyze 
 * @returns {String}
 */
export function stripAttributes(str) {
    return str.replaceAll(/<([a-z]\w*)\b[^>]*>/gi, (s, s1) => '<'+s1+'>');
}

/**
 * Retrieves the content(s) of a given tag as an array of strings
 * @param str string to analyze 
 * @param tag name of the tag whose content we want to retrieve
 * @returns {Array} each element of the array is the content of a tag tag
 */
export function getTagContent(str,tag) {
    
    let regexp = regexpTag(tag),
    occ = str.match(regexp),
    i,N;
    
    if (occ==null) return null;
    
    for (i=0,N=occ.length;i<N;i++) occ[i] = occ[i].replace(regexp, (s, s1, s2) => s2);
    
    return occ;
}

/**
 * Removes tags and their content
 * @param {String} str string to analyze 
 * @param {String} tag name of the tag to remove
 * @param {Array} content array that will be filled with the content of found tags (arrays pass by reference)
 * @@returns {String}
 */
export function stripTagAndContent(str,tag,content) {
    return str.replace(regexpTag(tag),function(str,p1,p2) { content && content.push(p2); return ''; });
}

/**
 * Transforms the string to camelCase type string (JavaScript style, uppercase replaces spaces/dashes/underscores)
 * @param str string to analyze 
 * @returns {String}
 */
export function camelize(str) {
    return lcfirst(str).replaceAll(/(-|_|\s+)([a-z])/ig, (str, p1, p2) => p2.toUpperCase());
}

/**
 * Replaces uppercase letters in a camelCase string with a dash
 * @param str string to analyze 
 * @returns {String}
 */
export function dasherize(str) {
    return str.replace(/[A-Z]/g,function(str){ return '-'+str.toLowerCase();});
}