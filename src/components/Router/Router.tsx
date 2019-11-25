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
	render: (params?: string) => JSX.Element;
	alias?: string;
	omitFromNavbar?: boolean;
};

export const Router: React.FC<IRouterProps> = ({ routes, fallbackRoutes }) => {
	const [currentRoute, setCurrentRoute] = React.useState<string>("/");
	const [currentRouteParams, setCurrentRouteParams] = React.useState<string>(
		""
	);

	React.useEffect(() => {
		// Route on load
		setCurrentRoute(window.location.pathname);

		// Route on popstate
		function onPopState(ev: PopStateEvent) {
			setCurrentRoute(ev.state.page);
		}

		window.addEventListener("popstate", onPopState);

		return () => {
			window.removeEventListener("popstate", onPopState);
		};
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
			return routes.get(currentRoute)!.render(currentRouteParams);
		} else if (isFallbackRoute) {
			const fallbackRoute = fallbackRoutes.get(currentRoute)!;
			return routes.get(fallbackRoute)!.render(currentRouteParams);
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

	// Takes care of client-side routing according to search term
	const handleSearch = (qry: string) => {
		if (qry.trim() === "") {
			// TODO: route to last location before search
			setCurrentRoute("/");
			history.pushState({ page: "/" }, "", "/");
			return;
		}

		// TODO: Handle loading page on search url
		const baseUrl = "/search";
		const queryParams = encodeURI(`?title=${qry}`);
		setCurrentRoute(baseUrl);
		setCurrentRouteParams(queryParams);
		history.pushState({ page: baseUrl }, "", `${baseUrl}${queryParams}`);
	};

	return (
		<>
			<Header onSearch={handleSearch} />
			<Navbar
				routes={routes}
				fallbackRoutes={fallbackRoutes}
				activeRoute={handleActiveNavbarLink()}
				onRouteChange={handleRouteChange}
			/>
			{renderRouteComponent()}
		</>
	);
};
