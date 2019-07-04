module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        browser: true
    },
    plugins: [
        "vue"
    ],
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 2017,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended'
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'vue/valid-v-for': 'off',
        'vue/valid-template-root': 'off',
        'vue/require-v-for-key': 'off',
        'vue/return-in-computed-property': [2],
        'vue/no-duplicate-attributes': [2],
        'vue/attribute-hyphenation': [2, 'always'],
        'vue/script-indent': ['off', 4, {
            'baseIndent': 0
        }],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        camelcase: 'off',
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    }
};