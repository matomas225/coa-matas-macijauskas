import { ReactNode } from "react";
import "./elements.scss";

type AProps = {
  href: string;
  onClick?: () => void;
  children: ReactNode;
};

export const A: React.FC<AProps> = ({
  children,
  href,
  onClick = () => null,
}) => {
  return (
    <div className="a-container">
      <a onClick={onClick} href={href}>
        {children}
      </a>
    </div>
  );
};
