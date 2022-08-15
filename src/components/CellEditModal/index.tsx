import { VFC, useState, useCallback, useEffect } from "react";
import { Modal } from "../Modal";
import CellEditPixels from "./components/CellEditPixels";
import CellEditColorBlock from "./components/CellEditColorBlock";
import CellEditInfoBlock from "./components/CellEditInfoBlock";
import { ApiUpdateCellData } from "../../constants/index";
import { asciiToHex } from "../../utils/asciiToHex";
import { PixelType } from "./types";
import { message } from "antd";
import {
	Wrapper,
	Title,
	CloseBtn,
	FlexWrapper,
	EditBlock,
	SubEditMenu,
	SubMenuItem,
	EditBlockWrapper,
} from "./style";

type Props = {
	isVisible: boolean;
	onClose: () => void;
	activeCellId: number;
	tonWalletAddress: string;
	actualCellData: any;
};

const generateEditSignHexString = (
	cellId: number,
	walletAddress: string
): string => {
<<<<<<< HEAD
	let editSignString = `Edit Cell #${[cellId].join(
		", #"
	)} by ${walletAddress} wallet`;
	console.log(editSignString);

	let editSignHexString = asciiToHex(editSignString);
	console.log(editSignHexString);
=======
  let editSignString = `Edit Cell #${[cellId].join(
    ", #"
  )} by ${walletAddress} wallet`;
  //console.log(editSignString);

  let editSignHexString = asciiToHex(editSignString);
  //console.log(editSignHexString);
>>>>>>> d6927110faa0e067f09eb4e8ce53a6047cc7d8fd

	return editSignHexString;
};

const getInitialInfoData = (
	userName: string,
	link: string,
	description: string
) => [
<<<<<<< HEAD
	{
		id: "tgName",
		value: userName,
		label: "TELEGRAM NAME:",
		placeholder: "name",
		link: "https://t.me/",
	},
	{
		id: "link",
		value: link,
		label: "LINK:",
		placeholder: "https://name.com",
		link: "https://t.me/",
	},
	{
		id: "description",
		value: description,
		label: "DESCRIPTION:",
		placeholder: "write your description in this field",
	},
=======
  {
    id: "tgName",
    value: userName,
    label: "TELEGRAM NAME:",
    placeholder: "name",
    link: "https://t.me/",
  },
  {
    id: "link",
    value: link,
    label: "LINK:",
    placeholder: "https://name.com",
    link: "https://t.me/",
  },
  {
    id: "description",
    value: description,
    label: "DESCRIPTION:",
    placeholder: "write your description in this field",
  },
>>>>>>> d6927110faa0e067f09eb4e8ce53a6047cc7d8fd
];

const getEditablePixels = (hexColorsString: string) => {
	const editablePixels: any[] = [];
	const minted =
		"#1AB90C#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#1AB90C#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#1AB90C#1AB90C#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#1AB90C#1AB90C";
	const payed =
		"#00AEE9#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#00AEE9#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#00AEE9#00AEE9#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#00AEE9#00AEE9";
	const reserve =
		"#DD0202#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#DD0202#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#DD0202#DD0202#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#FFFFFF#DD0202#DD0202";
	if (
		hexColorsString &&
		hexColorsString.length > 1 &&
		hexColorsString !== minted &&
		hexColorsString !== payed &&
		hexColorsString !== reserve
	) {
		const hexColorsArr = hexColorsString.match(/.{1,7}/g);

		for (let i = 0; i < hexColorsArr!.length; i++) {
			editablePixels.push({
				id: i + 1,
				hex: hexColorsArr![i],
			});
		}

		return editablePixels;
	}

	for (let i = 0; i < 256; i++) {
		editablePixels.push({
			id: i + 1,
			hex: "#FFFFFF",
		});
	}

	return editablePixels;
};

const CellEditModal: VFC<Props> = (props) => {
<<<<<<< HEAD
	const { isVisible, onClose, activeCellId, tonWalletAddress, actualCellData } =
		props;

	const [isPixelsEdit, setPixelsIsEdit] = useState<boolean>(false);
	const [isInfoEdit, setIsInfoEdit] = useState<boolean>(false);
	const [editablePixelsData, setEditablePixelsData] = useState(
		actualCellData && getEditablePixels(actualCellData.Image)
	);
	const [currentHex, setCurrentHex] = useState<string>("#000");
	const [isColorModeActive, setIsColorModeActive] = useState<boolean>(true);
	const [editableInfoData, setEditableInfoData] = useState(
		actualCellData &&
			getInitialInfoData(
				actualCellData.Username,
				actualCellData.Link,
				actualCellData.Text
			)
	);

	console.log(editablePixelsData);

	// const [hexPixelsData, setHexPixelsData] = useState<string>(initialHexData);

	const [fullEditData, setFullEditData] = useState<any>(
		actualCellData && {
			ids: [activeCellId],
			signature: "",
			wallet: tonWalletAddress,
			image: actualCellData.Image,
			username: actualCellData.Username,
			text: actualCellData.Text,
			link: actualCellData.Link,
			publicKey: "",
		}
	);

	console.log(actualCellData);

	const [isGettingSignature, setIsGettingSignature] = useState<boolean>(false);

	const tonProvider = (window as any).ton;

	const handleColorClick = (hex: string) => {
		setCurrentHex(hex);
	};

	const toggleIsPixelsEdit = useCallback(() => {
		setPixelsIsEdit((prev) => !prev);
	}, []);

	const toggleIsInfoEdit = useCallback(() => {
		setIsInfoEdit((prev) => !prev);
	}, []);

	const getEditSignature = async () => {
		const hexSignEditData = generateEditSignHexString(
			activeCellId,
			tonWalletAddress
		);

		if (tonProvider) {
			try {
				const editSignature = await tonProvider.send("ton_rawSign", [
					{
						data: hexSignEditData,
					},
				]);

				return editSignature;
			} catch (error) {
				console.log(error);
			}
		} else {
			message.error("Please, install a ton wallet extension");
		}
	};

	const createUpdateCellDataRequest = async (data: any) => {
		const requestOptions: any = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		const response = await fetch(ApiUpdateCellData, requestOptions);

		return await response.json();
	};

	const getEditSignAndPublicKey = async () => {
		setIsGettingSignature(true);

		const receivedSignature = await getEditSignature();

		const walletInfo = await tonProvider.send("ton_requestWallets");
		const publicKey = walletInfo[0].publicKey;

		setIsGettingSignature(false);
		return { receivedSignature, publicKey };
	};

	console.log(isGettingSignature);

	const handleSavePixelsData = async () => {
		let pixelsDataForBackend = "";

		if (isPixelsEdit) {
			for (let i = 0; i < editablePixelsData.length; i++) {
				pixelsDataForBackend += editablePixelsData[i].hex;
			}

			if (pixelsDataForBackend === actualCellData.Image) {
				toggleIsPixelsEdit();

				return;
			}

			if (fullEditData.signature !== "" && fullEditData.publicKey !== "") {
				setFullEditData((prev: any) => ({
					...prev,
					image: pixelsDataForBackend,
				}));

				return;
			}

			const { receivedSignature, publicKey } = await getEditSignAndPublicKey();

			setFullEditData((prev: any) => ({
				...prev,
				image: pixelsDataForBackend,
				signature: receivedSignature,
				publicKey: publicKey,
			}));

			return;
		}

		toggleIsPixelsEdit();
	};

	useEffect(() => {
		(async () => {
			if (isPixelsEdit) {
				try {
					const { status } = await createUpdateCellDataRequest(fullEditData);

					if (status === "ok") {
						toggleIsPixelsEdit();
						message.success("Successful editing!");
					}
				} catch (error) {
					toggleIsPixelsEdit();
					message.error("Error!");
					console.log(error);
				}

				console.log(fullEditData);
			}
		})();
	}, [fullEditData]);

	// console.log("Is ready to fetch:", isReadyToFetch);

	const handleSaveInfoData = async () => {
		if (isInfoEdit) {
			if (
				actualCellData.Username === editableInfoData[0].value &&
				actualCellData.Text === editableInfoData[2].value &&
				actualCellData.Link === editableInfoData[1].value
			) {
				toggleIsInfoEdit();
				return;
			}

			if (fullEditData.signature !== "" && fullEditData.publicKey !== "") {
				setFullEditData({
					...fullEditData,
					username: editableInfoData[0].value,
					text: editableInfoData[2].value,
					link: editableInfoData[1].value,
				});

				return;
			}

			const { receivedSignature, publicKey } = await getEditSignAndPublicKey();

			setFullEditData({
				...fullEditData,
				signature: receivedSignature,
				publicKey: publicKey,
				username: editableInfoData[0].value,
				text: editableInfoData[2].value,
				link: editableInfoData[1].value,
			});

			return;
		}

		toggleIsInfoEdit();
	};

	const handleCancelBtnClick = () => {
		if (isPixelsEdit) {
			if (isGettingSignature && fullEditData.signature === "") {
				setIsGettingSignature(false);
				toggleIsPixelsEdit();
				message.error("Whoops, try sign the signature again");
			}

			return;
		}

		onClose();
	};

	useEffect(() => {
		(async () => {
			if (isInfoEdit) {
				try {
					const { status } = await createUpdateCellDataRequest(fullEditData);

					if (status === "ok") {
						toggleIsInfoEdit();
						message.success("Successful editing!");
					}
				} catch (error) {
					toggleIsInfoEdit();
					message.error("Error!");
					console.log(error);
				}

				console.log(fullEditData);
			}
		})();
	}, [fullEditData]);

	return (
		<Modal isVisible={isVisible} onClose={onClose}>
			<Wrapper>
				<CloseBtn onClick={handleCancelBtnClick}>Cancel</CloseBtn>
				<Title>
					EDIT MODE <span>(Cell: #{activeCellId})</span>
				</Title>
				<FlexWrapper>
					<CellEditPixels
						isEdit={isPixelsEdit}
						currentHex={currentHex}
						editablePixelsData={editablePixelsData}
						setEditablePixelsData={setEditablePixelsData}
					/>
					<EditBlockWrapper>
						<SubEditMenu>
							<SubMenuItem
								isActive={isColorModeActive}
								onClick={() => setIsColorModeActive(true)}>
								COLOR
							</SubMenuItem>
							<SubMenuItem
								isActive={!isColorModeActive}
								onClick={() => setIsColorModeActive(false)}>
								INFO
							</SubMenuItem>
						</SubEditMenu>
						<EditBlock>
							{isColorModeActive ? (
								<CellEditColorBlock
									isEdit={isPixelsEdit}
									handleColorClick={handleColorClick}
									currentHex={currentHex}
									handleSavePixelsData={handleSavePixelsData}
									isGettingSignature={isGettingSignature}
								/>
							) : (
								<CellEditInfoBlock
									isEdit={isInfoEdit}
									editableInfoData={editableInfoData}
									setEditableInfoData={setEditableInfoData}
									handleSaveInfoData={handleSaveInfoData}
									isGettingSignature={isGettingSignature}
								/>
							)}
						</EditBlock>
					</EditBlockWrapper>
				</FlexWrapper>
			</Wrapper>
		</Modal>
	);
=======
  const { isVisible, onClose, activeCellId, tonWalletAddress, actualCellData } =
    props;

  const [isPixelsEdit, setPixelsIsEdit] = useState<boolean>(false);
  const [isInfoEdit, setIsInfoEdit] = useState<boolean>(false);
  const [editablePixelsData, setEditablePixelsData] = useState(
    actualCellData && getEditablePixels(actualCellData.Image)
  );
  const [currentHex, setCurrentHex] = useState<string>("#000");
  const [isColorModeActive, setIsColorModeActive] = useState<boolean>(true);
  const [editableInfoData, setEditableInfoData] = useState(
    actualCellData &&
      getInitialInfoData(
        actualCellData.Username,
        actualCellData.Link,
        actualCellData.Text
      )
  );

  //console.log(editablePixelsData);

  // const [hexPixelsData, setHexPixelsData] = useState<string>(initialHexData);

  const [fullEditData, setFullEditData] = useState<any>(
    actualCellData && {
      ids: [activeCellId],
      signature: "",
      wallet: tonWalletAddress,
      image: actualCellData.Image,
      username: actualCellData.Username,
      text: actualCellData.Text,
      link: actualCellData.Link,
      publicKey: "",
    }
  );

  // console.log(actualCellData);

  const [isGettingSignature, setIsGettingSignature] = useState<boolean>(false);

  const tonProvider = (window as any).ton;

  const handleColorClick = (hex: string) => {
    setCurrentHex(hex);
  };

  const toggleIsPixelsEdit = useCallback(() => {
    setPixelsIsEdit((prev) => !prev);
  }, []);

  const toggleIsInfoEdit = useCallback(() => {
    setIsInfoEdit((prev) => !prev);
  }, []);

  const getEditSignature = async () => {
    const hexSignEditData = generateEditSignHexString(
      activeCellId,
      tonWalletAddress
    );

    if (tonProvider) {
      try {
        const editSignature = await tonProvider.send("ton_rawSign", [
          {
            data: hexSignEditData,
          },
        ]);

        return editSignature;
      } catch (error) {
        //console.log(error);
      }
    } else {
      message.error("Please, install a ton wallet extension");
    }
  };

  const createUpdateCellDataRequest = async (data: any) => {
    const requestOptions: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(ApiUpdateCellData, requestOptions);

    return await response.json();
  };

  const getEditSignAndPublicKey = async () => {
    setIsGettingSignature(true);

    const receivedSignature = await getEditSignature();

    const walletInfo = await tonProvider.send("ton_requestWallets");
    const publicKey = walletInfo[0].publicKey;

    setIsGettingSignature(false);
    return { receivedSignature, publicKey };
  };

  //console.log(isGettingSignature);

  const handleSavePixelsData = async () => {
    let pixelsDataForBackend = "";

    if (isPixelsEdit) {
      for (let i = 0; i < editablePixelsData.length; i++) {
        pixelsDataForBackend += editablePixelsData[i].hex;
      }

      if (pixelsDataForBackend === actualCellData.Image) {
        toggleIsPixelsEdit();

        return;
      }

      if (fullEditData.signature !== "" && fullEditData.publicKey !== "") {
        setFullEditData((prev: any) => ({
          ...prev,
          image: pixelsDataForBackend,
        }));

        return;
      }

      const { receivedSignature, publicKey } = await getEditSignAndPublicKey();

      setFullEditData((prev: any) => ({
        ...prev,
        image: pixelsDataForBackend,
        signature: receivedSignature,
        publicKey: publicKey,
      }));

      return;
    }

    toggleIsPixelsEdit();
  };

  useEffect(() => {
    (async () => {
      if (isPixelsEdit) {
        try {
          const { status } = await createUpdateCellDataRequest(fullEditData);

          if (status === "ok") {
            toggleIsPixelsEdit();
            message.success("Successful editing!");
          }
        } catch (error) {
          toggleIsPixelsEdit();
          message.error("Error!");
          //console.log(error);
        }

        //console.log(fullEditData);
      }
    })();
  }, [fullEditData]);

  // console.log("Is ready to fetch:", isReadyToFetch);

  const handleSaveInfoData = async () => {
    if (isInfoEdit) {
      if (
        actualCellData.Username === editableInfoData[0].value &&
        actualCellData.Text === editableInfoData[2].value &&
        actualCellData.Link === editableInfoData[1].value
      ) {
        toggleIsInfoEdit();
        return;
      }

      if (fullEditData.signature !== "" && fullEditData.publicKey !== "") {
        setFullEditData({
          ...fullEditData,
          username: editableInfoData[0].value,
          text: editableInfoData[2].value,
          link: editableInfoData[1].value,
        });

        return;
      }

      const { receivedSignature, publicKey } = await getEditSignAndPublicKey();

      setFullEditData({
        ...fullEditData,
        signature: receivedSignature,
        publicKey: publicKey,
        username: editableInfoData[0].value,
        text: editableInfoData[2].value,
        link: editableInfoData[1].value,
      });

      return;
    }

    toggleIsInfoEdit();
  };

  const handleCancelBtnClick = () => {
    if (isPixelsEdit) {
      if (isGettingSignature && fullEditData.signature === "") {
        setIsGettingSignature(false);
        toggleIsPixelsEdit();
        message.error("Whoops, try sign the signature again");
      }

      return;
    }

    onClose();
  };

  useEffect(() => {
    (async () => {
      if (isInfoEdit) {
        try {
          const { status } = await createUpdateCellDataRequest(fullEditData);

          if (status === "ok") {
            toggleIsInfoEdit();
            message.success("Successful editing!");
          }
        } catch (error) {
          toggleIsInfoEdit();
          message.error("Error!");
          //console.log(error);
        }

        //console.log(fullEditData);
      }
    })();
  }, [fullEditData]);

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Wrapper>
        <CloseBtn onClick={handleCancelBtnClick}>Cancel</CloseBtn>
        <Title>
          EDIT MODE <span>(Cell: #{activeCellId})</span>
        </Title>
        <FlexWrapper>
          <CellEditPixels
            isEdit={isPixelsEdit}
            currentHex={currentHex}
            editablePixelsData={editablePixelsData}
            setEditablePixelsData={setEditablePixelsData}
          />
          <EditBlockWrapper>
            <SubEditMenu>
              <SubMenuItem
                isActive={isColorModeActive}
                onClick={() => setIsColorModeActive(true)}
              >
                COLOR
              </SubMenuItem>
              <SubMenuItem
                isActive={!isColorModeActive}
                onClick={() => setIsColorModeActive(false)}
              >
                INFO
              </SubMenuItem>
            </SubEditMenu>
            <EditBlock>
              {isColorModeActive ? (
                <CellEditColorBlock
                  isEdit={isPixelsEdit}
                  handleColorClick={handleColorClick}
                  currentHex={currentHex}
                  handleSavePixelsData={handleSavePixelsData}
                  isGettingSignature={isGettingSignature}
                />
              ) : (
                <CellEditInfoBlock
                  isEdit={isInfoEdit}
                  editableInfoData={editableInfoData}
                  setEditableInfoData={setEditableInfoData}
                  handleSaveInfoData={handleSaveInfoData}
                  isGettingSignature={isGettingSignature}
                />
              )}
            </EditBlock>
          </EditBlockWrapper>
        </FlexWrapper>
      </Wrapper>
    </Modal>
  );
>>>>>>> d6927110faa0e067f09eb4e8ce53a6047cc7d8fd
};

export default CellEditModal;
