import React, { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

interface CustomNavLinkProps {
    to: string;
    children: ReactNode;
  }

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, children }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <li className={match ? "active" : ""}>
        <Link to={to}>{children}</Link>
      </li>
    );
}

export default CustomNavLink;
