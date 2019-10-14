import React from "react";
import star_icon from "../../assets/star_icon.svg";
import watch_later_icon from "../../assets/watch_later_icon.svg";

export interface IMovieCardProps {
	title: string;
	overview: string;
	release_date: string;
	vote_average: number;
	poster_path: string;
}

const StarIcon: React.FC = () => {
	return (
		<div
			className="star-icon"
			dangerouslySetInnerHTML={{ __html: star_icon }}
		></div>
	);
};

const WatchLaterIcon: React.FC = () => {
	return (
		<div
			className="watch-later-icon"
			dangerouslySetInnerHTML={{ __html: watch_later_icon }}
			tabIndex={0}
		></div>
	);
};

export const MovieCard: React.FC<IMovieCardProps> = ({
	title,
	overview,
	release_date,
	vote_average,
	poster_path,
}) => {
	return (
		<li className="movies__item" tabIndex={0}>
			<img
				src={`https://image.tmdb.org/t/p/w200${poster_path}`}
				alt={`${title} poster`}
			/>
			<div>
				<p>{title}</p>
				<p>
					<span className="movie-rating">
						{vote_average}
						<StarIcon />
					</span>
				</p>
				<p>{release_date}</p>
				<p>{overview}</p>
			</div>
			<WatchLaterIcon />
		</li>
	);
};
