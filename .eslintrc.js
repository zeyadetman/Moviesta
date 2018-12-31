module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": 0,
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-mixed-spaces-and-tabs": [2, "smart-tabs"],
        "arrow-spacing": 2,
        "curly": 2,
        "eol-last": 0,
        "indent": [2, 2],
        "no-lonely-if": 2,
        "no-spaced-func": 2,
        "no-unused-vars": 2,
        "no-var": 2,
        'no-console': 'off',
        "prefer-const": 2,
        "quotes": [2, "single"],
        "jsx-quotes": [1, "prefer-double"],
        "space-before-blocks": 2,

        "react/jsx-no-duplicate-props": 2,
        "react/jsx-no-undef": 2,
        "react/jsx-uses-react": 2,
        "react/no-danger": 2,
        "react/no-unknown-property": 2,
        "react/self-closing-comp": 2,
        "react/sort-comp": 2
    }
};