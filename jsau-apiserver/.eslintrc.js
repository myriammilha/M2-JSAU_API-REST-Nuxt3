'use strict'

module.exports = {
    root: true,
    extends: 'usecases/usecase/nodejs',
    env: {
        jest: true,
        node: true,
    },
    rules: {
        'no-console': 'off',
        strict: ['error', 'global'],
        'no-await-in-loop': 'off'
    },
}
