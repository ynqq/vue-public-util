import { ElButton } from 'element-plus';
import { IPublicButtonProps } from '@app/types/index';
const VuePublicButton = (props: IPublicButtonProps) => {
  const { onClick, ...otherProps } = props;
  const handleClick = (e: Event) => {
    onClick && onClick(e);
  };
  return () => (
    <span>
      <ElButton
        {...otherProps}
        onClick={(e: Event) => {
          handleClick(e);
        }}
      ></ElButton>
    </span>
  );
};
VuePublicButton.name = 'pl-button';

export default VuePublicButton;
