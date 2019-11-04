import React from "react";
import { IMovie } from "../components/MoviesListing/MovieCard";

export const ADD_WATCH_LATER = "ADD_WATCH_LATER";
export const REMOVE_WATCH_LATER = "REMOVE_WATCH_LATER";
export const CLEAR_WATCH_LATER = "CLEAR_WATCH_LATER";

interface AddWatchLaterAction {
	type: typeof ADD_WATCH_LATER;
	payload: IMovie;
}
interface RemoveWatchLaterAction {
	type: typeof REMOVE_WATCH_LATER;
	payload: IMovie;
}
interface ClearWatchLaterAction {
	type: typeof CLEAR_WATCH_LATER;
	payload: IMovie;
}

export type WatchLaterActionTypes =
	| AddWatchLaterAction
	| RemoveWatchLaterAction
	| ClearWatchLaterAction;

const reducer = (state: IMovie[], action: WatchLaterActionTypes) => {
	switch (action.type) {
		case ADD_WATCH_LATER:
			return [...state, action.payload];
		case REMOVE_WATCH_LATER:
			return state.filter(m => {
				if (m.id === action.payload.id) {
					return false;
				}
				return true;
			});
		case CLEAR_WATCH_LATER:
			return [];
		default:
			throw new Error("Invalid watch later action");
	}
};

type UseWatchLaterReturnType = [
	IMovie[],
	React.Dispatch<WatchLaterActionTypes>
];

export const useWatchLater = (): UseWatchLaterReturnType => {
	const [movies, dispatch] = React.useReducer(reducer, []);

	return [movies, dispatch];
};
