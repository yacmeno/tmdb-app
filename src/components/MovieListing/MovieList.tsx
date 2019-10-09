import React from "react";
import { MovieCard, IMovieCardProps } from "./MovieCard";

interface IMovieListProps {
	currentRoute: string;
}

export const MovieList: React.FC<IMovieListProps> = ({ currentRoute }) => {
	const [movies, setMovies] = React.useState<IMovieCardProps[]>([]);
	const [popularMovies, setPopularMovies] = React.useState<IMovieCardProps[]>(
		[]
	);
	const [watchLaterMovies, setWatchLaterMovies] = React.useState<
		IMovieCardProps[]
	>([]);

	React.useEffect(() => {
		setPopularMovies([
			{
				title: "Batman",
				overview: "Batman overview",
				release_date: "2019",
				vote_average: 4,
			},
			{
				title: "Spider man",
				overview: "Spider man overview",
				release_date: "2018",
				vote_average: 3,
			},
		]);

		setWatchLaterMovies([
			{
				title: "Godfather",
				overview: "Godfather overview",
				release_date: "2017",
				vote_average: 2,
			},
			{
				title: "Goodfellas",
				overview: "Goodfellas overview",
				release_date: "2016",
				vote_average: 1,
			},
		]);
	}, []);

	React.useEffect(() => {
		if (currentRoute === "/" || currentRoute === "/popular") {
			setMovies(popularMovies);
		} else if (currentRoute === "/watch-later") {
			setMovies(watchLaterMovies);
		}
	}, [currentRoute, popularMovies, watchLaterMovies]);

	return (
		<ul
			style={{
				color: "white",
				display: "flex",
				alignItems: "center",
				width: "80%",
				margin: "auto",
				flexWrap: "wrap",
			}}
		>
			{movies.map((movie, i) => (
				<MovieCard
					key={i}
					title={movie.title}
					release_date={movie.release_date}
					overview={movie.overview}
					vote_average={movie.vote_average}
				/>
			))}
		</ul>
	);
};
