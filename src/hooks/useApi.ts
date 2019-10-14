import React from "react";
import { IMovieCardProps } from "../components/MovieListing/MovieCard";

const API_KEY = "f1030bfefbdb04054df3f155f848fb65";
const API_URL = "https://api.themoviedb.org/3/movie";

interface PopularMoviesResponse {
	page: number;
	total_results: number;
	total_pages: number;
	results: IMovieCardProps[];
}

interface UseApiProps {
	page: string;
}

type UseApiReturnType = [
	{ hasError: boolean; isLoading: boolean; data: PopularMoviesResponse },
	React.Dispatch<React.SetStateAction<string>>
];

const DEFAULT_PARAMS: UseApiProps = {
	page: "1",
};

const INITIAL_DATA: PopularMoviesResponse = {
	page: 1,
	total_results: 0,
	total_pages: 0,
	results: [],
};

export const useApi = ({ page } = DEFAULT_PARAMS): UseApiReturnType => {
	const URL = `${API_URL}/popular?api_key=${API_KEY}`;

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [hasError, setHasError] = React.useState<boolean>(false);
	const [data, setData] = React.useState<PopularMoviesResponse>(INITIAL_DATA);
	const [currentPage, setCurrentPage] = React.useState<string>(page);

	React.useEffect(() => {
		const fetchData = () => {
			setHasError(false);
			setIsLoading(true);

			fetch(`${URL}${`&page=${currentPage}`}`)
				.then(res => res.json())
				.then(resData => {
					if ("errors" in resData) {
						setHasError(true);
						setIsLoading(false);
					} else {
						setData(prevData => {
							return {
								...resData,
								results: [...prevData.results, ...resData.results],
							};
						});
						setIsLoading(false);
					}
				})
				.catch(() => {
					setHasError(true);
					setIsLoading(false);
				});
		};

		fetchData();
	}, [currentPage]);

	return [{ isLoading, hasError, data }, setCurrentPage];
};
