import React from "react";
import Header from "../Header";
import Navbar from "../Nav/Navbar";
import { NoRoute } from "./NoRoute";

interface IRouterProps {
	routes: Map<string, RouteValue>;
	fallbackRoutes: Map<string, string>;
}

export type RouteValue = {
	name: string;
	render: () => JSX.Element;
	alias?: string;
};

export const Router: React.FC<IRouterProps> = ({ routes, fallbackRoutes }) => {
	const [currentRoute, setCurrentRoute] = React.useState<string>("/");

	// Setup initial route client navigated to
	React.useEffect(() => {
		const browserRoute = window.location.pathname;
		setCurrentRoute(browserRoute);
	}, []);

	const handleRouteChange = (
		ev: React.MouseEvent,
		targetRoute: string
	): void => {
		ev.preventDefault();
		setCurrentRoute(targetRoute);
		history.pushState({ page: targetRoute }, "", targetRoute);
	};

	const renderRouteComponent = (): JSX.Element => {
		const isRoute = routes.has(currentRoute);
		const isFallbackRoute = fallbackRoutes.has(currentRoute);

		// Non-Null assertion operator because of https://github.com/Microsoft/TypeScript/issues/9619
		if (isRoute) {
			return routes.get(currentRoute)!.render();
		} else if (isFallbackRoute) {
			const fallbackRoute = fallbackRoutes.get(currentRoute)!;
			return routes.get(fallbackRoute)!.render();
		} else {
			return <NoRoute />;
		}
	};

	const handleActiveNavbarLink = (): string | null => {
		if (routes.has(currentRoute)) {
			return currentRoute;
		} else if (fallbackRoutes.has(currentRoute)) {
			return fallbackRoutes.get(currentRoute)!;
		} else {
			return null;
		}
	};

	return (
		<>
			<Header />
			<Navbar
				routes={routes}
				fallbackRoutes={fallbackRoutes}
				activeRoute={handleActiveNavbarLink()}
				onRouteChange={(e: React.MouseEvent, route: string) =>
					handleRouteChange(e, route)
				}
			/>
			{renderRouteComponent()}
		</>
	);
};
