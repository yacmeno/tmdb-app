import React from "react";

const Navigation: React.FC = () => {
	return (
		<nav className="navigation">
			<ul>
				<li>
					<a href="#popular">Popular</a>
				</li>
				<li>
					<a href="#watch-later">Watch later</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
