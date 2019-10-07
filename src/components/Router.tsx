import React from "react";
import Header from "./Header";
import Navbar from "./Nav/Navbar";
import { MovieList } from "./MovieListing/MovieList";

interface IRouterProps {
	routes: Map<string, string>;
}

export const Router: React.FC<IRouterProps> = ({ routes }) => {
	const [currentRoute, setCurrentRoute] = React.useState<string>("/");

	// Setup initial route client navigated to
	React.useEffect(() => {
		const browserRoute = window.location.pathname;
		setCurrentRoute(browserRoute);
	}, []);

	const handleRouteChange = (ev: React.MouseEvent, targetRoute: string) => {
		ev.preventDefault();
		setCurrentRoute(targetRoute);
		history.pushState({ page: targetRoute }, "", targetRoute);
	};

	return (
		<>
			<Header />
			<Navbar
				routes={routes}
				currentRoute={currentRoute}
				onRouteChange={(e: React.MouseEvent, route: string) =>
					handleRouteChange(e, route)
				}
			/>
			<MovieList currentRoute={currentRoute} />
		</>
	);
};
