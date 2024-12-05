import {Link, useNavigate} from 'react-router-dom'
import { signOut } from 'aws-amplify/auth';
import './Navbar.css'
export default function NavBar(){
    const navigate = useNavigate();
    const handleSignOut = ()=>{
        console.log("Signing out");
        try{
            signOut();
            console.log("Navigate");
            navigate('/login');
        }catch(e){
            console.log(e);
        }
    }
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
            <Link onClick={()=>handleSignOut()}>Logout</Link>
        </div>
    </div>
    )
}