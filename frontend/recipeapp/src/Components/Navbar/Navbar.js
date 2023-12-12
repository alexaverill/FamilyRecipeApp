import {Link} from 'react-router-dom'
import './Navbar.css'
export default function NavBar(){
    return (
    <div class="navbar">
        <div class="title-row">
        <div class="title"><Link to="/">Family Recipe App</Link></div>
        <div class="links">
            <Link>Cookbook</Link>
            <Link>Collections</Link>
        </div>
        </div>
        <div class="links">
            <Link>My Favorites</Link>
            <Link>Logout</Link>
        </div>
    </div>
    )
}