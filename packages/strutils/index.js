function regexpTag(tag) { return new RegExp("<("+tag+")\\b[^>]*>([\\s\\S]*?)<\\/\\1>","gi");};

const rTags = /<\/?([a-z]\w*)\b[^>]*>/gi;

/**
 * Encodes a string to base64.
 * @param input string to encode
 * @returns {String}
 */
export function base64encode(input) { return window.btoa( this.utf8encode(input) ); }

/**
 * Decodes a base64 encoded string.
 * @param input string to decode
 * @returns {String}
 */
export function base64decode(input) { return this.utf8decode( window.atob(input) ); }

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
 * Encoding a string to UTF8 format
 * @param string
 * @returns {String}
 */
export function utf8encode(string) {
    //Johan Sundström
    return window.unescape( this.urlencode( string ) );
}

/**
 * Decoding a UTF8 string to ISO-8859-1
 * @param string
 * @returns {String}
 */
export function utf8decode(string) {
    //Johan Sundström
    return this.urldecode( window.escape(string) );
}

/**
 * Detects if the string is encoded in UTF8 or not
 * @param string
 * @returns {Boolean}
 * @link https://github.com/wayfind/is-utf8
 */
export function isUtf8(string) {
    
    var i = 0;
    while(i < string.length)
    {
        if(     (// ASCII
        string[i] == 0x09 ||
            string[i] == 0x0A ||
            string[i] == 0x0D ||
            (0x20 <= string[i] && string[i] <= 0x7E)
            )
            ) {
            i += 1;
            continue;
        }
        
        if(     (// non-overlong 2-byte
        (0xC2 <= string[i] && string[i] <= 0xDF) &&
            (0x80 <= string[i+1] && string[i+1] <= 0xBF)
            )
            ) {
            i += 2;
            continue;
        }
        
        if(     (// excluding overlongs
        string[i] == 0xE0 &&
            (0xA0 <= string[i + 1] && string[i + 1] <= 0xBF) &&
            (0x80 <= string[i + 2] && string[i + 2] <= 0xBF)
            ) ||
            (// straight 3-byte
        ((0xE1 <= string[i] && string[i] <= 0xEC) ||
            string[i] == 0xEE ||
            string[i] == 0xEF) &&
            (0x80 <= string[i + 1] && string[i+1] <= 0xBF) &&
            (0x80 <= string[i+2] && string[i+2] <= 0xBF)
            ) ||
            (// excluding surrogates
        string[i] == 0xED &&
            (0x80 <= string[i+1] && string[i+1] <= 0x9F) &&
            (0x80 <= string[i+2] && string[i+2] <= 0xBF)
            )
            ) {
            i += 3;
            continue;
        }
        
        if(     (// planes 1-3
        string[i] == 0xF0 &&
            (0x90 <= string[i + 1] && string[i + 1] <= 0xBF) &&
            (0x80 <= string[i + 2] && string[i + 2] <= 0xBF) &&
            (0x80 <= string[i + 3] && string[i + 3] <= 0xBF)
            ) ||
            (// planes 4-15
        (0xF1 <= string[i] && string[i] <= 0xF3) &&
            (0x80 <= string[i + 1] && string[i + 1] <= 0xBF) &&
            (0x80 <= string[i + 2] && string[i + 2] <= 0xBF) &&
            (0x80 <= string[i + 3] && string[i + 3] <= 0xBF)
            ) ||
            (// plane 16
        string[i] == 0xF4 &&
            (0x80 <= string[i + 1] && string[i + 1] <= 0x8F) &&
            (0x80 <= string[i + 2] && string[i + 2] <= 0xBF) &&
            (0x80 <= string[i + 3] && string[i + 3] <= 0xBF)
            )
            ) {
            i += 4;
            continue;
        }
        
        return false;
    }
    
    return true;
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
    
    return str.charAt(0).toLowerCase() + str.substr(1);
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
export function stripTags(str,allowed) {
    
    allowed = slice.call(arguments,1);
    
    return str.replace(rTags, function (s, s1) { return allowed.indexOf(s1.toLowerCase()) !== -1 ? s : '';});
}

/**
 * Removes tags from the string.
 * Unlike stripTags, this method works with a blacklist rather than a whitelist.
 * @param str string to analyze
 * @param forbidden tag to remove. The number of arguments is unlimited.
 * @returns {String}
 * @see stripTags
 */
export function stripTagsR(str,forbidden) {
    
    forbidden = slice.call(arguments,1);
    
    return str.replace(rTags, function (s, s1) { return forbidden.indexOf(s1.toLowerCase()) !== -1 ? '' : s;});
}

/**
 * Removes attributes from tags
 * @param str string to analyze 
 * @returns {String}
 */
export function stripAttributes(str) {
    
    return str.replace('/<([a-z]\w*)\b[^>]*>/i', function(s) { return '<'+s+'>'; });
}

/**
 * Retrieves the content(s) of a given tag as an array of strings
 * @param str string to analyze 
 * @param tag name of the tag whose content we want to retrieve
 * @returns {Array} each element of the array is the content of a tag tag
 */
export function getTagContent(str,tag) {
    
    var regexp = regexpTag(tag),
    occ = str.match(regexp),
    i,N;
    
    if (occ===null) return null;
    
    for (i=0,N=occ.length;i<N;i++) occ[i] = occ[i].replace(regexp,function(str,p1) { return p1; });
    
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
    return str.replace(/(-|_|\s+)([a-z])/ig,function(str,p1,p2){ return p2.toUpperCase();});
}

/**
 * Replaces uppercase letters in a camelCase string with a dash
 * @param str string to analyze 
 * @returns {String}
 */
export function dasherize(str) {
    return str.replace(/[A-Z]/g,function(str){ return '-'+str.toLowerCase();});
}