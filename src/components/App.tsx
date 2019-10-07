import React from "react";
import { Router } from "./Router";

const routes = new Map<string, string>();
routes.set("/popular", "Popular");
routes.set("/watch-later", "Watch later");

const App: React.FC = () => {
	return <Router routes={routes} />;
};

export default App;
