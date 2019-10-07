import React from "react";

interface ILinkProps {
	to: string;
	text: string;
	onRouteChange: any;
	currentRoute: string;
}

export const Link: React.FC<ILinkProps> = ({
	to,
	text,
	onRouteChange,
	currentRoute,
}) => {
	return (
		<a
			className={currentRoute === to ? "active" : ""}
			href={to}
			onClick={(e: React.MouseEvent) => onRouteChange(e, to)}
		>
			{text}
		</a>
	);
};
