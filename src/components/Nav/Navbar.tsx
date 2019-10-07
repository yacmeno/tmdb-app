import React from "react";
import { Link } from "./Link";

interface INavigationProps {
	routes: Map<string, string>;
	currentRoute: string;
	onRouteChange: any;
}

export const Navbar: React.FC<INavigationProps> = ({
	routes,
	onRouteChange,
	currentRoute,
}) => {
	const links: JSX.Element[] = [];

	routes.forEach((v, k) =>
		links.push(
			<li key={k}>
				<Link
					to={k}
					text={v}
					onRouteChange={(e: React.MouseEvent, route: string) =>
						onRouteChange(e, route)
					}
					currentRoute={currentRoute}
				/>
			</li>,
		),
	);

	return (
		<nav className="navigation">
			<ul>{links}</ul>
		</nav>
	);
};

export default Navbar;
