import { ButtonHTMLAttributes } from 'react';

type Props = {
  text: string;
  variant?: string;
  classNames?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  variant = '',
  classNames = '',
  ...props
}: Props) {
  return (
    <button {...props} className={`btn ${variant} ${classNames} normal-case`}>
      {text}
    </button>
  );
}
