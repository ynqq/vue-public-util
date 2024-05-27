import { getCurrentInstance } from 'vue';

export const log = () => {
  console.log(getCurrentInstance());
};
