import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    "rules": {
      "indent": ["error", 2],
      "@typescript-eslint/no-explicit-any": "off",
      // "no-unused-vars": [2, {"vars": "all", "args": "after-used"}]
    }
  }),
];

export default eslintConfig;
