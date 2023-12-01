import { $t } from '@app/locales';

export default {
  includesClass: ['el-dialog', 'el-drawer'],
  className: 'pl-loading-box',
  spinner: {
    className: ['pl-loading-spinner'],
  },
  message: {
    className: ['pl-loading-spinner-text'],
    info: $t('loadingText'),
  },
};
