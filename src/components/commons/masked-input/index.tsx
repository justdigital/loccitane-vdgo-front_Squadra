import React from "react";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
  children?: React.ReactNode;
}
  
const MaskedInput = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, mask, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask={mask}
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      ></IMaskInput>
    );
  },
);

export default MaskedInput;