import React from "react";
import { Router, RouteValue } from "./Router/Router";
import { MoviesList } from "./MoviesListing/MoviesList";
import { useIndexedDB } from "../hooks/useIndexedDB";

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
routes.set("/search", {
	name: "Search",
	/* eslint-disable react/display-name */
	render: params => (
		<MoviesList currentRoute={"/search"} currentRouteParams={params} />
	),
	omitFromNavbar: true,
});

const fallbackRoutes = new Map<string, string>();
fallbackRoutes.set("/", "/popular");

export interface IDBContext {
	DB: IDBDatabase | null;
	DBError: boolean;
}

export const DBContext = React.createContext<IDBContext>({
	DB: null,
	DBError: false,
});

const App: React.FC = () => {
	const { DB, hasError: DBError } = useIndexedDB();

	return (
		<DBContext.Provider value={{ DB, DBError }}>
			<Router routes={routes} fallbackRoutes={fallbackRoutes} />
		</DBContext.Provider>
	);
};

export default App;
