import eslint from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";
import { flatConfig } from "@next/eslint-plugin-next";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  flatConfig.recommended,
  flatConfig.coreWebVitals,
  {
    files: ["**/*.ts", "**/*.tsx"],

    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      eslintPluginPrettierRecommended,
    ],

    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          caughtErrorsIgnorePattern: "^err$",
          argsIgnorePattern: "^_",
        },
      ],
      curly: ["error", "all"],
    },
  },
);
