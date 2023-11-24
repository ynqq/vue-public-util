import { ButtonProps } from 'element-plus';
export interface IPublicButtonProps extends ButtonProps {
  duration?: number;
  onClick?: (...args: any[]) => any;
}
