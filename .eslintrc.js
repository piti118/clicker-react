module.exports = {
    "extends": "airbnb",
    "plugins": [
      "react",
      "jsx-a11y",
      "import"
    ],
    "env": {
      "browser": true,
      "jest": true
    },
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/forbid-prop-types": 0,
      "semi": 0,
      "react/sort-comp": 0,
      "react/prop-types": [1, { ignore: ["history", "location", "children", "match"] }],
      "class-methods-use-this": 0,
      "react/no-multi-comp": 0,
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-param-reassign": ["error", { "props": false }]
    }
};
