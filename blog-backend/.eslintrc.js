const path = require('path')

module.exports = {
    "extends": "airbnb-base",
    "settings": {
        "import/resolver": {
            "node": {
            "paths": [path.resolve("./src")],
            "moduleDirectory": ["node_modules", "/"]
            }
        }
    },
    "rules":{
        "no-unused-vars": 1,
        "comma-dangle": 0,
        "eol-last": 0,
        "no-console": 0,
        "semi": 0,
    }
};