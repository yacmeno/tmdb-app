import React from "react";

interface ILinkProps {
	to: string;
	text: string;
	onRouteChange: any;
	isActive: boolean;
}

export const Link: React.FC<ILinkProps> = ({
	to,
	text,
	onRouteChange,
	isActive,
}) => {
	return (
		<a
			className={isActive ? "active" : ""}
			href={to}
			onClick={(e: React.MouseEvent) => onRouteChange(e, to)}
		>
			{text}
		</a>
	);
};
