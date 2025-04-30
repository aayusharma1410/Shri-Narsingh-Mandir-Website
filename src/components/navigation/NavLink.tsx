
import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
  textColorClass: string;
}

export const NavLink = ({ to, children, isActive, textColorClass }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`
        relative px-3 py-2 
        ${textColorClass} no-underline
        transition-all duration-400 ease-in-out
        hover:tracking-[4px]
        ${isActive ? "font-medium" : "font-normal"}
      `}
    >
      {children}
    </Link>
  );
};
