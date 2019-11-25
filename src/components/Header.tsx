import React from "react";
import logo from "../assets/tmdb_logo.svg";
import search_icon from "../assets/search_icon.svg";

const Logo: React.FC = () => {
	return (
		<div
			className="header__logo"
			dangerouslySetInnerHTML={{ __html: logo }}
		></div>
	);
};

interface ISearchIconProps {
	onClick: () => void;
}
const SearchIcon: React.FC<ISearchIconProps> = ({ onClick }) => {
	return (
		<div
			className="header__logo search-button"
			tabIndex={0}
			dangerouslySetInnerHTML={{ __html: search_icon }}
			onClick={() => onClick()}
		></div>
	);
};

interface IHeaderProps {
	onSearch: (query: string) => void;
}

const Header: React.FC<IHeaderProps> = ({ onSearch }) => {
	const [query, setQuery] = React.useState<string>("");

	React.useEffect(() => {
		onSearch(query);
	}, [query]);

	const handleReturnKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			onSearch(query);
		}
	};

	return (
		<div className="header">
			<Logo />
			<input
				className="header__search"
				type="text"
				placeholder="Search..."
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setQuery(e.target.value);
				}}
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
					handleReturnKey(e)
				}
			/>
			<SearchIcon onClick={() => onSearch(query)} />
		</div>
	);
};

export default Header;
