import { ReactNode } from "react";
import "./elements.scss";

type AProps = {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: ReactNode;
};

export const A: React.FC<AProps> = ({ children, href, onClick = (e) => e }) => {
  return (
    <div className="a-container">
      <a
        onClick={(e) => {
          e.preventDefault();
          onClick?.(e);
        }}
        href={href}
      >
        {children}
      </a>
    </div>
  );
};
