import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = {
  variant?: string;
  classNames?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = '',
  classNames = '',
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button {...props} className={`btn ${variant} ${classNames} normal-case`}>
      {children}
    </button>
  );
}
