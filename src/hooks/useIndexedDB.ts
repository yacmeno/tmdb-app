import React from "react";
import {
	WatchLaterActionTypes,
	ADD_WATCH_LATER,
	REMOVE_WATCH_LATER,
	LOAD_WATCH_LATER,
} from "./useWatchLater";

// event typing issue: https://github.com/Microsoft/TypeScript/issues/28293

const DB_NAME = "tmdb-app-db";
const DB_VERSION = 1;
const DB_STORE_NAME = "WatchLaterStore";

// create or load IndexedDB
export const useIndexedDB = () => {
	const [DB, setDB] = React.useState<IDBDatabase | null>(null);
	const [hasError, setHasError] = React.useState<boolean>(false);

	React.useEffect(() => {
		const request = window.indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = () => {
			// The database did not previously exist, so create object stores and indexes.
			const db = request.result;
			const store = db.createObjectStore(DB_STORE_NAME, {
				keyPath: "id",
			});

			// Indexes that will allow lookup by title and id
			const titleIndex = store.createIndex("by_title", "title", {
				unique: true,
			});

			setDB(db);
		};

		request.onsuccess = () => {
			setDB(request.result);
		};

		request.onerror = () => {
			setHasError(true);
		};
	}, []);

	return { DB, hasError };
};

export const useTransaction = (
	DB: IDBDatabase,
	action: WatchLaterActionTypes
) => {
	const tx = DB.transaction(DB_STORE_NAME, "readwrite");
	const store = tx.objectStore(DB_STORE_NAME);

	switch (action.type) {
		case ADD_WATCH_LATER:
			try {
				return store.put(action.payload);
			} catch (err) {
				return console.error(`IndexedDB transaction error: ${err}`);
			}
		case REMOVE_WATCH_LATER:
			try {
				return store.delete(action.payload.id);
			} catch (err) {
				return console.error(`IDB transaction error: ${err}`);
			}
		case LOAD_WATCH_LATER:
			try {
				const getSavedMovies = store.getAll();

				getSavedMovies.onsuccess = () => {
					action.callback(getSavedMovies.result);
				};

				getSavedMovies.onerror = () => {
					console.error("Error loading movies from IndexedDB");
				};
				return;
			} catch (err) {
				return console.error("Error loading movies from IndexedDB");
			}
		default:
			throw new Error("Invalid watch later action");
	}
};
