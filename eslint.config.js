import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    rules: {
      // ...rules,
    },
  },
];
