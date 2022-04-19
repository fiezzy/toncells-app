import { FC, useRef, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { Wrapper } from "./style";

type Props = {
	onClose: () => void;
	isVisible: boolean;
};

const PORTAL_TARGET = "portal";

export const Modal: FC<Props> = (props) => {
	const { children, onClose, isVisible } = props;

	const domElement = document.getElementById(PORTAL_TARGET);

	const outsideRef = useRef(null);

	const handleWrapperClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.target === outsideRef.current) {
			onClose();
		}
	};

	const handleKeyDown = useCallback(
		({ key }: KeyboardEvent) => {
			if (key === "Escape") {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleKeyDown]);

	if (!domElement || !isVisible) {
		return null;
	}

	return ReactDOM.createPortal(
		<Wrapper ref={outsideRef} onClick={handleWrapperClick}>
			{children}
		</Wrapper>,
		domElement
	);
};
