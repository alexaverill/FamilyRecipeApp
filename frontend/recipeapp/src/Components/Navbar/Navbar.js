import {Link} from 'react-router-dom'
import './Navbar.css'
export default function NavBar(){
    return (
    <div className="navbar">
        <div className="title-row">
        <div className="title"><Link to="/">Family Recipe App</Link></div>
        <div className="links">
            <Link to="/">Cookbook</Link>
            <Link to='/collections'>Collections</Link>
        </div>
        </div>
        <div className="links">
            <Link to="/favorites">My Favorites</Link>
            <Link>Logout</Link>
        </div>
    </div>
    )
}