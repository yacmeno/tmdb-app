import React from "react";
import { MovieCard, IMovie } from "./MovieCard";
import { useApi } from "../../hooks/useApi";
import { useWatchLater } from "../../hooks/useWatchLater";

interface IMovieListProps {
	currentRoute: string;
}

export const MoviesList: React.FC<IMovieListProps> = ({ currentRoute }) => {
	const [movies, setMovies] = React.useState<IMovie[]>([]);

	const [watchLaterMovies, setWatchLaterMovies] = useWatchLater([]);

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

	const onLoadMore = () => {
		const nextPage = (popularMoviesData.page + 1).toString();
		changePage(nextPage);
	};

	const isInWatchLater = (movieId: IMovie["id"]): boolean => {
		return watchLaterMovies.some(m => {
			return m.id === movieId;
		});
	};

	return (
		<>
			<ul className="movies__list">
				{movies.map((movie, i) => (
					<MovieCard
						key={i}
						movie={movie}
						setWatchLaterMovies={setWatchLaterMovies}
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
