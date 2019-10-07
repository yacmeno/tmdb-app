import React from "react";
import { MovieCard, IMovieCardProps } from "./MovieCard";

interface IMovieListProps {
	currentRoute: string;
}

export const MovieList: React.FC<IMovieListProps> = ({ currentRoute }) => {
	const [movies, setMovies] = React.useState<IMovieCardProps[]>([]);

	React.useEffect(() => {
		// api call for first page of popular movies
		popularMovies.push(
			{
				title: "batman",
				overview: "Some long text",
				release_date: "January 2918",
				vote_average: 4,
			},
			{
				title: "the godfather",
				overview: "Some long text",
				release_date: "January 2918",
				vote_average: 4,
			},
			{
				title: "superman",
				overview: "Some long text",
				release_date: "January 2918",
				vote_average: 4,
			},
		);
	}, []);

	React.useEffect(() => {
		if (currentRoute === "/" || currentRoute === "/popular") {
			setMovies(popularMovies);
		} else if (currentRoute === "/watch-later") {
			setMovies(watchLaterMovies);
		}
	}, [currentRoute]);

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

const popularMovies: IMovieCardProps[] = [];

const watchLaterMovies: IMovieCardProps[] = [
	{
		title: "spider man",
		overview: "Some long text",
		release_date: "January 2918",
		vote_average: 4,
	},
	{
		title: "ant man",
		overview: "Some long text",
		release_date: "January 2918",
		vote_average: 4,
	},
	{
		title: "bad man",
		overview: "Some long text",
		release_date: "January 2918",
		vote_average: 4,
	},
];
