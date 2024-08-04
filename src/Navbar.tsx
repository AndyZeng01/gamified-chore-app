import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { usePoints } from "./PointsContext";

type CustomLinkProps = {
  to: string,
  children: React.ReactNode,
  [key: string]: any;
}

function Navbar() {
  const { points } = usePoints();
  
    return (
      <nav className="nav">
        <Link to="/" className="site-title">IRL SIDEQUESTS</Link> 
        
        <span className="point-counter">Points: {points} </span>
        
        <ul>
        <CustomLink to="/play" className="site-title">PLAY</CustomLink>
        <CustomLink to="/profile" className="site-title">PROFILE</CustomLink>
        </ul>
      </nav>
    )
  }

  function CustomLink({ to, children, ...props }: CustomLinkProps) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }

export default Navbar