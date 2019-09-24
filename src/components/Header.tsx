import React from "react";
import logo from "../assets/tmdb_logo.svg";
import search_icon from "../assets/search_icon.svg";

const Logo: React.FC = () => {
	return (
		<div
			className="header__logo"
			dangerouslySetInnerHTML={{ __html: logo }}
		></div>
	);
};

const SearchIcon: React.FC = () => {
	return (
		<div
			className="header__logo search-button"
			tabIndex={0}
			dangerouslySetInnerHTML={{ __html: search_icon }}
		></div>
	);
};

const Header: React.FC = () => {
	return (
		<div className="header">
			<Logo />
			<input className="header__search" type="text" placeholder="Search..." />
			<SearchIcon />
		</div>
	);
};

export default Header;
