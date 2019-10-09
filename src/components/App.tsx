import React from "react";
import { Router, RouteValue } from "./Router/Router";
import { MovieList } from "./MovieListing/MovieList";

const routes = new Map<string, RouteValue>();
routes.set("/popular", {
	name: "Popular",
	render: () => <MovieList currentRoute={"/popular"} />,
	alias: "/",
});
routes.set("/watch-later", {
	name: "Watch later",
	render: () => <MovieList currentRoute={"/watch-later"} />,
});

const fallbackRoutes = new Map<string, string>();
fallbackRoutes.set("/", "/popular");

const App: React.FC = () => {
	return <Router routes={routes} fallbackRoutes={fallbackRoutes} />;
};

export default App;
