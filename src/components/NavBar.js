import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from '../images/Logo-2.png';


class NavBar extends Component {
	// create buttons that link to Home, Events, Bars, and the log in page
	render() {
		return(
        <nav>
				<ul>
					<li className="logo"><img src={Logo} alt="logo" /></li>
          <li className="box" >
            <Link to='/fight_cards'> fight cards </Link>
          </li>
          <li className="box" >
            <Link to="/fights_saved" > saved fights </Link>
          </li>
          <li className="box" >
            <Link to="/fighters"> fighters  </Link>
          </li>
          <li className="box" >
            <Link to="/fighters_saved"> saved fighters  </Link>
          </li>
          <li >
            <button onClick={this.props.logout}>logout</button>
          </li>
					</ul>
        </nav>
		);
	}
}

export default NavBar;
