import React from "react";
import { MovieCard, IMovie } from "./MovieCard";
import { useApi } from "../../hooks/useApi";
import {
	useWatchLater,
	WatchLaterActionTypes,
	LOAD_WATCH_LATER,
	ADD_WATCH_LATER,
} from "../../hooks/useWatchLater";
import { DBContext } from "../App";
import { useTransaction } from "../../hooks/useIndexedDB";

interface IMovieListProps {
	currentRoute: string;
}

export const MoviesList: React.FC<IMovieListProps> = ({ currentRoute }) => {
	const [movies, setMovies] = React.useState<IMovie[]>([]);

	const DBCtx = React.useContext(DBContext);
	const [watchLaterMovies, setWatchLaterMovies] = useWatchLater();

	const [{ isLoading, hasError, data: popularMoviesData }, changePage] = useApi(
		{
			page: "1",
		}
	);

	React.useEffect(() => {
		if (currentRoute === "/" || currentRoute === "/popular") {
			setMovies(popularMoviesData.results);
		} else if (currentRoute === "/watch-later") {
			setMovies(watchLaterMovies);
		}
	}, [currentRoute, popularMoviesData, watchLaterMovies]);

	React.useEffect(() => {
		if (DBCtx.DB === null || DBCtx.DBError) {
			return;
		}

		useTransaction(DBCtx.DB, {
			type: LOAD_WATCH_LATER,
			payload: null,
			callback: (movies: IMovie[]) => {
				setWatchLaterMovies({ type: ADD_WATCH_LATER, payload: movies });
			},
		});
	}, [DBCtx]);

	const onLoadMore = () => {
		const nextPage = (popularMoviesData.page + 1).toString();
		changePage(nextPage);
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

		useTransaction(DBCtx.DB, action);
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
			{currentRoute === "/popular" && (
				<div className="movies__more">
					{isLoading ? (
						<div className="spinner"></div>
					) : (
						<button onClick={onLoadMore}>Load more</button>
					)}
					{hasError && <p>An error has occured 😵</p>}
				</div>
			)}
		</>
	);
};
