import Link from "next/link"
import { useState, useEffect } from "react";


export const Header2 : React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    
    const handleLogout = () => {
        sessionStorage.removeItem('username');
      };

    useEffect(() => {
        setUsername(sessionStorage.getItem("username"));
      }, []);

    return(
    <header>
        <nav className="navbar navbar-light navbar-expand-md fixed-top" id="mainNav" style={{ color: 'rgba(0,0,0.29)', backgroundColor:'rgba(0,0,0,0.8)', borderBottomColor:'rgba(255,255,255,0.8)',}}>
        <div className="container"><a className="navbar-brand" href="/">Le Cocktailbar</a><button data-bs-toggle="collapse" className="navbar-toggler navbar-toggler-right" data-bs-target="#navbarResponsive" type="button" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" value="Menu"><i className="fa fa-bars"></i></button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item nav-link"><Link className="nav-link" href="/">Home</Link></li>
                    <li className="nav-item nav-link"><Link className="nav-link" href="/users">Users</Link></li>
                    <li className="nav-item nav-link"><Link className="nav-link" href="/events">Events</Link></li>
                    <li className="nav-item nav-link"><Link className="nav-link" href="/cocktails">cocktails</Link></li>
                    <li className="nav-item nav-link"><Link className="nav-link" href="/orders">Orders</Link></li>
                    {username ? ( <li className="nav-item nav-link"><Link className="nav-link" href="/login" onClick={handleLogout}> Logout</Link></li> ) : ( <li className="nav-item nav-link"><Link className="nav-link" href="/login">Login</Link></li>)}
                </ul>
            </div>
        </div>
    </nav>
    </header>
    )
}