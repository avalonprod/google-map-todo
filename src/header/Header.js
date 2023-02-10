import { Link } from 'react-router-dom';



import './header.css'


const Header = () =>{

    
    return(
        <div className="header">
            <Link to='/'>Public</Link>
            <Link to='/private'>Private</Link>
        </div>
    )
}


export default Header;
