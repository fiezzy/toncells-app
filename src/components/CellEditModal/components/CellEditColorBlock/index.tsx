import { VFC, useRef, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import { rgbToHex } from "../../../../utils/rgbToHex";
import { Spin } from "antd";
import {
	LoadingOutlined,
	ClearOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import {
	ColorsWrapper,
	SaveBtn,
	CurrentColorWrapper,
	CurrentColorBlock,
	ClearAllBtn,
	HiddenInput,
} from "./style";

type Props = {
	isEdit: boolean;
	currentHex: string;
	handleSavePixelsData: () => void;
	isGettingSignature: boolean;
	setCurrentHex: (hex: any) => void;
	clearAllImage: () => void;
	copyImage: () => void;
	pasteImage: () => void;
	uploadImage: (image: string) => void;
};

const CellEditColorBlock: VFC<Props> = (props) => {
	const {
		isEdit,
		currentHex,
		handleSavePixelsData,
		isGettingSignature,
		setCurrentHex,
		clearAllImage,
		copyImage,
		pasteImage,
		uploadImage,
	} = props;

	const [color, setColor] = useColor("hex", currentHex);
	const [uploadedImageInHex, setUploadedImageInHex] = useState<string>("");

	const hiddenInput = useRef<HTMLInputElement>(null);

	const hasCopiedImage =
		localStorage.getItem("copiedImage") !== null &&
		localStorage.getItem("copiedImage") !== undefined;

	console.log(hasCopiedImage);

	const handleFileInputChange = (uploadedImage: File) => {
		// let uploadedImageInHexStr;

		let img = new Image();
		img.src = uploadedImage ? URL.createObjectURL(uploadedImage) : "";

		let canvas = document.getElementById("canvas") as any;
		let ctx = canvas.getContext("2d");

		img.onload = function () {
			ctx.drawImage(img, 0, 0, 16, 16);
			console.log("let pixel = : ", ctx.getImageData(16, 16, 1, 1));
			let data = [] as any;

			for (let i = 0; i < 256; i++) {
				let pixel = ctx.getImageData(i % 16, Math.floor(i / 16), 1, 1);

				data = [...data, pixel.data];

				if (i === 255) {
					console.log(data.length);
					const hexStr = data
						.map((e: any) => rgbToHex(e[0], e[1], e[2]))
						.join("");

					uploadImage(hexStr);
				}
			}
		};
	};

	const handleUploadClick = () => {
		hiddenInput.current!.click();
	};

	return (
		<>
			<div>
				<ColorsWrapper isEdit={isEdit}>
					{isEdit ? (
						<ColorPicker
							width={322}
							height={150}
							color={color}
							onChange={isEdit ? setColor : () => {}}
							onChangeComplete={
								isEdit ? (color) => setCurrentHex(color.hex) : () => {}
							}
							hideRGB
							hideHSV
						/>
					) : (
						<ColorPicker
							width={322}
							height={150}
							color={color}
							onChange={isEdit ? setColor : () => {}}
							onChangeComplete={
								isEdit ? (color) => setCurrentHex(color.hex) : () => {}
							}
							hideRGB
							hideHSV
							hideHEX
						/>
					)}
				</ColorsWrapper>
				{isEdit && (
					<CurrentColorWrapper>
						<CurrentColorBlock color={currentHex} />
						<ClearAllBtn onClick={clearAllImage}>
							<ClearOutlined />
						</ClearAllBtn>
					</CurrentColorWrapper>
				)}
			</div>

			{isGettingSignature ? (
				<SaveBtn color={currentHex} isGettingSignature={isGettingSignature}>
					<Spin indicator={<LoadingOutlined />} style={{ color: "#000" }} />
				</SaveBtn>
			) : (
				<>
					<HiddenInput
						ref={hiddenInput}
						type="file"
						name="myImage"
						onChange={(event: any) => {
							handleFileInputChange(event.target.files[0]);
						}}
					/>
					{!isEdit && (
						<SaveBtn color={currentHex} onClick={handleUploadClick}>
							<UploadOutlined />
							UPLOAD IMAGE
						</SaveBtn>
					)}

					{!isEdit && (
						<SaveBtn
							color={currentHex}
							onClick={hasCopiedImage ? pasteImage : copyImage}>
							{hasCopiedImage ? "PASTE" : "COPY"}
						</SaveBtn>
					)}

					<SaveBtn onClick={handleSavePixelsData} color={currentHex}>
						{isEdit ? "SAVE" : "EDIT"}
					</SaveBtn>
				</>
			)}
		</>
	);
};

export default CellEditColorBlock;
