module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script'
    },
    plugins: ['html'],
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'no-undef': 'warn',
        'no-redeclare': 'off',
        semi: ['error', 'always'],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }]
    },
    globals: {
        confetti: 'readonly'
    }
};
