import React from "react";
import { Link } from "./Link";
import { RouteValue } from "../Router/Router";

interface INavigationProps {
	routes: Map<string, RouteValue>;
	fallbackRoutes: Map<string, string>;
	activeRoute: string | null;
	onRouteChange: (e: React.MouseEvent, route: string) => void;
}

export const Navbar: React.FC<INavigationProps> = ({
	routes,
	onRouteChange,
	activeRoute,
}) => {
	const links: JSX.Element[] = [];

	routes.forEach((v, k) => {
		if (v.omitFromNavbar) {
			return;
		}

		links.push(
			<li key={k}>
				<Link
					to={k}
					text={v.name}
					onRouteChange={onRouteChange}
					isActive={activeRoute === k}
				/>
			</li>
		);
	});

	return (
		<nav className="navigation">
			<ul>{links}</ul>
		</nav>
	);
};

export default Navbar;
