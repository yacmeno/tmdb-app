import React from "react";
import { IMovie } from "../components/MoviesListing/MovieCard";

const API_KEY = "f1030bfefbdb04054df3f155f848fb65";
const POPULAR_API_URL = "https://api.themoviedb.org/3/movie";
const SEARCH_API_URL = "https://api.themoviedb.org/3/search";

interface PopularMoviesResponse {
	page: number;
	total_results: number;
	total_pages: number;
	results: IMovie[];
}

interface UsePopularApiParams {
	page: string;
}

type UsePopularApiReturnType = [
	{ hasError: boolean; isLoading: boolean; data: PopularMoviesResponse },
	React.Dispatch<React.SetStateAction<string>>
];

const POPULAR_DEFAULT_PARAMS: UsePopularApiParams = {
	page: "1",
};

const POPULAR_INITIAL_DATA: PopularMoviesResponse = {
	page: 1,
	total_results: 0,
	total_pages: 0,
	results: [],
};

export const usePopularApi = ({
	page,
} = POPULAR_DEFAULT_PARAMS): UsePopularApiReturnType => {
	const URL = `${POPULAR_API_URL}/popular?api_key=${API_KEY}`;

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [hasError, setHasError] = React.useState<boolean>(false);
	const [data, setData] = React.useState<PopularMoviesResponse>(
		POPULAR_INITIAL_DATA
	);
	const [currentPage, setCurrentPage] = React.useState<string>(page);

	React.useEffect(() => {
		let abortEffect = false;
		const fetchData = () => {
			setHasError(false);
			setIsLoading(true);

			fetch(`${URL}${`&page=${currentPage}`}`)
				.then(res => res.json())
				.then(resData => {
					if (!abortEffect) {
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
					}
				})
				.catch(() => {
					if (!abortEffect) {
						setHasError(true);
						setIsLoading(false);
					}
				});
		};

		fetchData();

		return () => {
			abortEffect = true;
		};
	}, [currentPage, URL]);

	return [{ isLoading, hasError, data }, setCurrentPage];
};

type SearchResponse = PopularMoviesResponse;

interface UseSearchApiParams {
	page: string;
	query: string;
}

type UseSearchApiReturnType = [
	{ hasError: boolean; isLoading: boolean; data: SearchResponse },
	React.Dispatch<React.SetStateAction<string>>,
	React.Dispatch<React.SetStateAction<string>>
];

const SEARCH_DEFAULT_PARAMS: UseSearchApiParams = {
	page: "1",
	query: "",
};

const SEARCH_INITIAL_DATA: SearchResponse = POPULAR_INITIAL_DATA;

export const useSearchApi = ({
	query,
	page,
} = SEARCH_DEFAULT_PARAMS): UseSearchApiReturnType => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [hasError, setHasError] = React.useState<boolean>(false);
	const [data, setData] = React.useState<SearchResponse>(SEARCH_INITIAL_DATA);
	const [currentPage, setCurrentPage] = React.useState<string>(page);
	const [qry, setQry] = React.useState<string>(query);
	const [debouncing, setDebouncing] = React.useState<boolean>(false);

	const searchCallback = React.useCallback(
		(keepPrevData = false) => {
			if (debouncing) {
				return;
			}

			const URL = `${SEARCH_API_URL}/movie?api_key=${API_KEY}&query=${qry}&page=${currentPage}`;
			setHasError(false);
			setIsLoading(true);

			fetch(`${URL}`)
				.then(res => res.json())
				.then(resData => {
					if ("errors" in resData) {
						setHasError(true);
						setIsLoading(false);
					} else {
						if (keepPrevData) {
							setData(prevData => {
								return {
									...resData,
									results: [...prevData.results, ...resData.results],
								};
							});
						} else {
							setData({
								...resData,
								results: [...resData.results],
							});
						}

						setIsLoading(false);
					}
				})
				.catch(() => {
					setHasError(true);
					setIsLoading(false);
				});
		},
		[debouncing, qry, currentPage]
	);

	React.useEffect(() => {
		if (qry.trim() === "") {
			return;
		}
		setDebouncing(true);
		setCurrentPage("1");

		const timedDebouncing = setTimeout(() => {
			setDebouncing(false);
		}, 1000);

		return () => {
			clearTimeout(timedDebouncing);
		};
	}, [qry]);

	React.useEffect(() => {
		if (qry.trim() === "") {
			return;
		}

		if (currentPage !== "1") {
			searchCallback(true);
		} else {
			searchCallback();
		}
	}, [qry, currentPage, searchCallback]);

	return [{ isLoading, hasError, data }, setCurrentPage, setQry];
};
