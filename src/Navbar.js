import React, { Component } from 'react';
import '../styles/index.css';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
// import { goHome } from '../actions/index';
// import Upload from './Upload';


class Navbarheader extends Component {
	render() {
		return(
			<div className="navbar">
				<Navbar inverse fixedTop>
          <Navbar.Header>
          
						<Navbar.Brand>
							<a href="/">BlockchainJS</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<NavItem eventKey={1} href="#">BLOCKS</NavItem>
							<NavItem eventKey={2} href="#">CHAIN</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default Navbarheader;