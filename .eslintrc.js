module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'space-before-function-paren': ['error', 'never'],
        'comma-dangle': ['error', 'always-multiline'],
        'space-before-blocks': 'error',
        'object-curly-spacing': ['error', 'always'],
        'no-console': 'off',
        'no-alert': 'off',
        'linebreak-style': 0,
        'no-var': 0,
        'import/extensions': ['error', 'always'],
    },
};
