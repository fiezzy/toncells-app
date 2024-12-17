import { VFC } from "react";
import { Wrapper, Label } from "./style";

const OpenOnDesktop: VFC = () => {
	return (
		<Wrapper>
			<Label>
				We apologize for the inconvenience. The site is being worked on.
				Estimated launch time of the site is 08/01/2022.
				<br />
				<br />
				While work is underway, you can go to our{" "}
			</Label>
		</Wrapper>
	);
};

// DONT TOUCH
//  <Label>This is mainnet domen. Right now toncells in alpha stage.</Label>
// <br />
// <br />
// <Label>
//   Go to{" "}
//   <a href={"https://testnet.app.toncells.org"}>
//     https://testnet.app.toncells.org
//   </a>
// </Label>
export default OpenOnDesktop;
