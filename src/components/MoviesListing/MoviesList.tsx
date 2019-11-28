import React from "react";
import { MovieCard, IMovie } from "./MovieCard";
import { usePopularApi, useSearchApi } from "../../hooks/useApi";
import {
	useWatchLater,
	WatchLaterActionTypes,
	LOAD_WATCH_LATER,
	ADD_WATCH_LATER,
} from "../../hooks/useWatchLater";
import { DBContext } from "../App";
import { IDBTransaction } from "../../hooks/useIndexedDB";

interface IMovieListProps {
	currentRoute: string;
	currentRouteParams?: string;
}

export const MoviesList: React.FC<IMovieListProps> = ({
	currentRoute,
	currentRouteParams,
}) => {
	const [movies, setMovies] = React.useState<IMovie[]>([]);

	const DBCtx = React.useContext(DBContext);
	const [watchLaterMovies, setWatchLaterMovies] = useWatchLater();

	const [
		{
			isLoading: popularIsLoading,
			hasError: popularHasError,
			data: popularMoviesData,
		},
		popularChangePage,
	] = usePopularApi({
		page: "1",
	});

	const [
		{
			isLoading: searchIsLoading,
			hasError: searchHasError,
			data: searchMoviesData,
		},
		searchChangePage,
		searchQuery,
	] = useSearchApi({
		page: "1",
		query: "",
	});

	React.useEffect(() => {
		if (currentRoute === "/" || currentRoute === "/popular") {
			setMovies(popularMoviesData.results);
		} else if (currentRoute === "/watch-later") {
			setMovies(watchLaterMovies);
		} else if (currentRoute === "/search") {
			setMovies(searchMoviesData.results);
		}
	}, [currentRoute, popularMoviesData, watchLaterMovies, searchMoviesData]);

	React.useEffect(() => {
		if (!currentRouteParams) {
			return;
		}

		switch (currentRoute) {
			case "/search": {
				const params = new URLSearchParams(currentRouteParams);
				const movieTitle = params.get("title");

				if (movieTitle) {
					searchQuery(encodeURI(movieTitle));
				}
				break;
			}

			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentRouteParams, searchQuery]);

	React.useEffect(() => {
		if (DBCtx.DB === null || DBCtx.DBError) {
			return;
		}

		IDBTransaction(DBCtx.DB, {
			type: LOAD_WATCH_LATER,
			payload: null,
			callback: (movies: IMovie[]) => {
				setWatchLaterMovies({ type: ADD_WATCH_LATER, payload: movies });
			},
		});
	}, [DBCtx, setWatchLaterMovies]);

	const onLoadMore = () => {
		switch (currentRoute) {
			case "/popular": {
				const popularNextPage = (popularMoviesData.page + 1).toString();
				popularChangePage(popularNextPage);
				break;
			}
			case "/search": {
				const searchNextPage = (searchMoviesData.page + 1).toString();
				searchChangePage(searchNextPage);
				break;
			}
			default:
				break;
		}
	};

	const isInWatchLater = (movieId: IMovie["id"]): boolean => {
		return watchLaterMovies.some(m => {
			return m.id === movieId;
		});
	};

	const setMovieInDB = (action: WatchLaterActionTypes) => {
		if (DBCtx.DB === null || DBCtx.DBError) {
			console.error("Invalid IndexedDB");
			return;
		}

		IDBTransaction(DBCtx.DB, action);
	};

	const isLoading = () => {
		if (popularIsLoading || searchIsLoading) {
			return true;
		} else {
			return false;
		}
	};

	const hasError = () => {
		if (popularHasError || searchHasError) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			<ul className="movies__list">
				{movies.map((movie, i) => (
					<MovieCard
						key={i}
						movie={movie}
						setWatchLaterMovies={setWatchLaterMovies}
						setMovieInDB={setMovieInDB}
						isInWatchLater={isInWatchLater(movie.id)}
					/>
				))}
			</ul>
			{currentRoute !== "/watch-later" && (
				<div className="movies__more">
					{isLoading() ? (
						<div className="spinner"></div>
					) : (
						<button onClick={onLoadMore}>Load more</button>
					)}
					{hasError() && <p>An error has occured 😵</p>}
				</div>
			)}
		</>
	);
};
