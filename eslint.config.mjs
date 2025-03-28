import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      strict: 'off', // 关闭严格模式检查
      '@typescript-eslint/no-explicit-any': 'off', // 关闭对 any 的警告
    },
  },
];

export default eslintConfig;
