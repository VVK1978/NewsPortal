module.exports={
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier", "import"],
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "tsconfig.json"
  },
  rules: {
    "no-underscore-dangle": "off",
    "no-console": "off",
    '@typescript-eslint/no-non-null-assertion': 'off',
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before"
          }
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"]
      }
    }
  },
  overrides: [
    {
      files: ["*.js", "*.ts"]
    }
  ]
}
