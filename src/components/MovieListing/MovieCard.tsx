import React from "react";

export interface IMovieCardProps {
	title: string;
	overview: string;
	release_date: string;
	vote_average: number;
}

export const MovieCard: React.FC<IMovieCardProps> = ({
	title,
	overview,
	release_date,
	vote_average,
}) => {
	return (
		<li style={{ marginRight: "100px" }}>
			<p>{title}</p>
			<p>{overview}</p>
			<p>{release_date}</p>
			<p>{vote_average}</p>
		</li>
	);
};
