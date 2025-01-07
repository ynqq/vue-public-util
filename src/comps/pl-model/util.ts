import {
  EActionEnum,
  OmitRequired,
  PlButton,
  useOpen,
  usePlModal,
} from "vue-public-util";
import Com from "./Model.vue";
import { IComProps, IComValues } from "./type";

export const showAddModel = (props: OmitRequired<IComProps, "action">) => {
  props.action = props.action || EActionEnum.isCreate;
  return usePlModal<IComProps, IComValues>(Com, {
    title: "title",
  })(props as IComProps);
};
