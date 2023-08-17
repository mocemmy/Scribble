import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
				<NavLink exact to="/"><img className="logo" src="/images/scribble-logo-transparent.png" alt="scribble"/><h1 className='scribble'>&nbsp;Scribble</h1></NavLink>
			
			{isLoaded && (<ProfileButton user={sessionUser} />)}
		</div>
	);
}

export default Navigation;