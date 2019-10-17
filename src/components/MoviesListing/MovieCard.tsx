import React from "react";
import {
	WatchLaterActionTypes,
	ADD_WATCH_LATER,
	REMOVE_WATCH_LATER,
} from "../../hooks/useWatchLater";

import star_icon from "../../assets/star_icon.svg";
import watch_later_icon from "../../assets/watch_later_icon.svg";
import close_icon from "../../assets/close_icon.svg";

export interface IMovie {
	id: number;
	title: string;
	overview: string;
	release_date: string;
	vote_average: number;
	poster_path: string;
}

interface IMovieCardProps {
	movie: IMovie;
	setWatchLaterMovies: React.Dispatch<WatchLaterActionTypes>;
	isInWatchLater: boolean;
}

const StarIcon: React.FC = () => {
	return (
		<span
			className="star-icon"
			dangerouslySetInnerHTML={{ __html: star_icon }}
		></span>
	);
};

interface IWatchLaterIconProps {
	movie: IMovie;
	onAdd: (movie: IMovie) => void;
}

const WatchLaterIcon: React.FC<IWatchLaterIconProps> = ({ onAdd, movie }) => {
	const onPressEnter = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === "Enter") {
			onAdd(movie);
		}
	};
	return (
		<div
			className="watch-later-icon"
			dangerouslySetInnerHTML={{ __html: watch_later_icon }}
			tabIndex={0}
			onClick={() => onAdd(movie)}
			onKeyDown={onPressEnter}
		></div>
	);
};

interface IRemoveIconProps {
	movie: IMovie;
	onRemove: (movie: IMovie) => void;
}

const RemoveIcon: React.FC<IRemoveIconProps> = ({ onRemove, movie }) => {
	const onPressEnter = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (e.key === "Enter") {
			onRemove(movie);
		}
	};
	return (
		<div
			className="watch-later-icon"
			dangerouslySetInnerHTML={{ __html: close_icon }}
			tabIndex={0}
			onClick={() => onRemove(movie)}
			onKeyDown={onPressEnter}
		></div>
	);
};

export const MovieCard: React.FC<IMovieCardProps> = ({
	movie,
	setWatchLaterMovies,
	isInWatchLater,
}) => {
	const addToWatchLater = (movie: IMovie) => {
		setWatchLaterMovies({ type: ADD_WATCH_LATER, payload: movie });
	};
	const removeFromWatchLater = (movie: IMovie) => {
		setWatchLaterMovies({ type: REMOVE_WATCH_LATER, payload: movie });
	};
	return (
		<li className="movies__item" tabIndex={0}>
			<img
				src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
				alt={`${movie.title} poster`}
			/>
			<div>
				<p>{movie.title}</p>
				<p>
					<span className="movie-rating">
						{movie.vote_average}
						<StarIcon />
					</span>
				</p>
				<p>{movie.release_date}</p>
				<p>{movie.overview}</p>
			</div>
			{isInWatchLater ? (
				<RemoveIcon onRemove={removeFromWatchLater} movie={movie} />
			) : (
				<WatchLaterIcon onAdd={addToWatchLater} movie={movie} />
			)}
		</li>
	);
};
