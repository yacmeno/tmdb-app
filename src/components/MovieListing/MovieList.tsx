import React from "react";
import { MovieCard, IMovieCardProps } from "./MovieCard";
import { useApi } from "../../hooks/useApi";

interface IMovieListProps {
	currentRoute: string;
}

export const MovieList: React.FC<IMovieListProps> = ({ currentRoute }) => {
	const [movies, setMovies] = React.useState<IMovieCardProps[]>([]);

	const [watchLaterMovies, setWatchLaterMovies] = React.useState<
		IMovieCardProps[]
	>([]);

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

	return (
		<>
			<ul className="movies__list">
				{movies.map((movie, i) => (
					<MovieCard
						key={i}
						title={movie.title}
						release_date={movie.release_date}
						overview={movie.overview}
						vote_average={movie.vote_average}
						poster_path={movie.poster_path}
					/>
				))}
			</ul>
			<div className="movies__more">
				{isLoading ? (
					<div className="spinner"></div>
				) : (
					<button onClick={onLoadMore}>Load more</button>
				)}
				{hasError && <p>An error has occured 😵</p>}
			</div>
		</>
	);
};
