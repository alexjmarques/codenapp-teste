declare module 'react-input-mask' {
  import { ComponentType, InputHTMLAttributes } from 'react';

  interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string;
    formatChars?: { [key: string]: string };
    alwaysShowMask?: boolean;
  }

  const InputMask: ComponentType<InputMaskProps>;
  export default InputMask;
}