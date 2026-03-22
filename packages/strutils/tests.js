import * as utils from '@jsyg/strutils';

// ==================== BASE64 ENCODING/DECODING ====================
QUnit.module('Base64 Encoding/Decoding', () => {
    QUnit.test('should encode empty string', (assert) => {
        assert.strictEqual(utils.base64encode(''), '');
    });

    QUnit.test('should encode simple ASCII string', (assert) => {
        assert.strictEqual(utils.base64encode('Hello'), 'SGVsbG8=');
    });

    QUnit.test('should encode UTF-8 characters', (assert) => {
        const result = utils.base64encode('Héllo');
        assert.strictEqual(utils.base64decode(result), 'Héllo');
    });

    QUnit.test('should decode base64 correctly', (assert) => {
        assert.strictEqual(utils.base64decode('SGVsbG8='), 'Hello');
    });

    QUnit.test('round-trip encoding/decoding', (assert) => {
        const original = 'Test string with special chars: éàüñ';
        const encoded = utils.base64encode(original);
        const decoded = utils.base64decode(encoded);
        assert.strictEqual(decoded, original);
    });

    QUnit.test('should handle Chinese characters', (assert) => {
        const original = '你好世界';
        const encoded = utils.base64encode(original);
        const decoded = utils.base64decode(encoded);
        assert.strictEqual(decoded, original);
    });
});

// ==================== URL ENCODING/DECODING ====================
QUnit.module('URL Encoding/Decoding', () => {
    QUnit.test('should encode space as %20', (assert) => {
        assert.strictEqual(utils.urlencode(' '), '%20');
    });

    QUnit.test('should encode special characters', (assert) => {
        assert.strictEqual(utils.urlencode('&'), '%26');
        assert.strictEqual(utils.urlencode('='), '%3D');
        assert.strictEqual(utils.urlencode('?'), '%3F');
    });

    QUnit.test('should decode URL encoded string', (assert) => {
        assert.strictEqual(utils.urldecode('%20'), ' ');
        assert.strictEqual(utils.urldecode('%26'), '&');
    });

    QUnit.test('round-trip URL encoding/decoding', (assert) => {
        const original = 'Hello World & Test=Query';
        const encoded = utils.urlencode(original);
        const decoded = utils.urldecode(encoded);
        assert.strictEqual(decoded, original);
    });

    QUnit.test('should handle UTF-8 characters in URL', (assert) => {
        const original = 'café résumé';
        const encoded = utils.urlencode(original);
        const decoded = utils.urldecode(encoded);
        assert.strictEqual(decoded, original);
    });
});

// ==================== STRING CASE TRANSFORMATIONS ====================
QUnit.module('String Case Transformations', () => {
    QUnit.test('ucfirst - capitalize first letter', (assert) => {
        assert.strictEqual(utils.ucfirst('hello'), 'Hello');
        assert.strictEqual(utils.ucfirst('HELLO'), 'HELLO');
        assert.strictEqual(utils.ucfirst(''), '');
    });

    QUnit.test('lcfirst - lowercase first letter', (assert) => {
        assert.strictEqual(utils.lcfirst('Hello'), 'hello');
        assert.strictEqual(utils.lcfirst('HELLO'), 'hELLO');
        assert.strictEqual(utils.lcfirst(''), '');
    });

    QUnit.test('ucwords - capitalize each word', (assert) => {
        assert.strictEqual(utils.ucwords('hello world'), 'Hello World');
        assert.strictEqual(utils.ucwords('multiple   spaces'), 'Multiple   Spaces');
    });
});

// ==================== ACCENT REMOVAL ====================
QUnit.module('Accent Removal', () => {
    QUnit.test('should remove accents from vowels', (assert) => {
        assert.strictEqual(utils.stripAccents('é'), 'e');
        assert.strictEqual(utils.stripAccents('à'), 'a');
        assert.strictEqual(utils.stripAccents('ù'), 'u');
        assert.strictEqual(utils.stripAccents('î'), 'i');
        assert.strictEqual(utils.stripAccents('ô'), 'o');
    });

    QUnit.test('should handle mixed case', (assert) => {
        assert.strictEqual(utils.stripAccents('É'), 'E');
        assert.strictEqual(utils.stripAccents('À'), 'A');
    });

    QUnit.test('should handle full sentence', (assert) => {
        assert.strictEqual(utils.stripAccents('Café résumé naïve'), 'Cafe resume naive');
    });

    QUnit.test('should not modify non-accented characters', (assert) => {
        assert.strictEqual(utils.stripAccents('Hello World'), 'Hello World');
    });
});

// ==================== TAG MANIPULATION ====================
QUnit.module('Tag Manipulation', () => {
    QUnit.test('stripTags - remove all tags', (assert) => {
        assert.strictEqual(utils.stripTags('<p>Hello</p>'), 'Hello');
    });

    QUnit.test('stripTags - keep allowed tags', (assert) => {
        assert.strictEqual(utils.stripTags('<p>Hello <br>World</p>', 'br'), 'Hello <br>World');
    });

    QUnit.test('stripTagsR - remove forbidden tags', (assert) => {
        assert.strictEqual(utils.stripTagsR('<p>Hello <script>alert</script></p>', 'script'), '<p>Hello alert</p>');
    });

    QUnit.test('stripAttributes - remove attributes from tags', (assert) => {
        assert.strictEqual(utils.stripAttributes('<p class="test" id="main">Hello</p>'), '<p>Hello</p>');
    });

    QUnit.test('getTagContent - extract content from tags', (assert) => {
        const result = utils.getTagContent('<p>Hello</p><p>World</p>', 'p');
        assert.deepEqual(result, ["Hello", "World"]);
    });

    QUnit.test('stripTagAndContent - remove tags and content', (assert) => {
        const content = [];
        const result = utils.stripTagAndContent('<p>Hello</p>World<p>Test</p>', 'p', content);
        assert.strictEqual(result, 'World');
        assert.strictEqual(content.length, 2);
    });
});

// ==================== STRING FORMATTING ====================
QUnit.module('String Formatting', () => {
    QUnit.test('camelize - convert to camelCase', (assert) => {
        assert.strictEqual(utils.camelize('hello_world'), 'helloWorld');
        assert.strictEqual(utils.camelize('hello-world'), 'helloWorld');
        assert.strictEqual(utils.camelize('hello world'), 'helloWorld');
        assert.strictEqual(utils.camelize('Hello_World'), 'helloWorld');
    });

    QUnit.test('dasherize - convert camelCase to kebab-case', (assert) => {
        assert.strictEqual(utils.dasherize('helloWorld'), 'hello-world');
        assert.strictEqual(utils.dasherize('camelCaseString'), 'camel-case-string');
    });

    QUnit.test('dasherize - handle already dashed strings', (assert) => {
        assert.strictEqual(utils.dasherize('already-dashed'), 'already-dashed');
    });
});

// ==================== EDGE CASES ====================
QUnit.module('Edge Cases', () => {
    QUnit.test('empty strings', (assert) => {
        assert.strictEqual(utils.ucfirst(''), '');
        assert.strictEqual(utils.lcfirst(''), '');
        assert.strictEqual(utils.stripAccents(''), '');
        assert.strictEqual(utils.camelize(''), '');
    });

    QUnit.test('single character strings', (assert) => {
        assert.strictEqual(utils.ucfirst('a'), 'A');
        assert.strictEqual(utils.lcfirst('A'), 'a');
        assert.strictEqual(utils.ucwords('a'), 'A');
    });

    QUnit.test('strings with only special characters', (assert) => {
        assert.strictEqual(utils.ucfirst('!!!'), '!!!');
        assert.strictEqual(utils.stripAccents('!!!'), '!!!');
    });

    QUnit.test('null/undefined handling (if applicable)', (assert) => {
        // These should be handled gracefully or throw appropriate errors
        try {
            utils.ucfirst(null);
            assert.ok(false, 'Should have thrown error for null');
        } catch (e) {
            assert.ok(true, 'Correctly throws error for null');
        }
    });
});

// ==================== PERFORMANCE TESTS ====================
QUnit.module('Performance', () => {
    QUnit.test('base64encode performance with large string', (assert) => {
        const largeString = 'A'.repeat(10000);
        const start = performance.now();
        utils.base64encode(largeString);
        const end = performance.now();
        assert.ok(end - start < 100, 'Should complete in under 100ms');
    });
});