import { nodecfdiConfig } from '@nodecfdi/eslint-config';
import { defineFlatConfig } from 'eslint-define-config';

export default defineFlatConfig([
  ...nodecfdiConfig(),
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
]);
