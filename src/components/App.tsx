import React from "react";
import { Router, RouteValue } from "./Router/Router";
import { MoviesList } from "./MoviesListing/MoviesList";

const routes = new Map<string, RouteValue>();
routes.set("/popular", {
	name: "Popular",
	/* eslint-disable react/display-name */
	render: () => <MoviesList currentRoute={"/popular"} />,
	alias: "/",
});
routes.set("/watch-later", {
	name: "Watch later",
	/* eslint-disable react/display-name */
	render: () => <MoviesList currentRoute={"/watch-later"} />,
});

const fallbackRoutes = new Map<string, string>();
fallbackRoutes.set("/", "/popular");

const App: React.FC = () => {
	return <Router routes={routes} fallbackRoutes={fallbackRoutes} />;
};

export default App;
