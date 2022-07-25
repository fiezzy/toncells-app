import { VFC, ChangeEvent } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Wrapper,
  Label,
  FieldWrapper,
  Field,
  FieldValueLabel,
  DescriptionArea,
  EditBtn,
} from "./style";

const PRE_TG_LINK = "https://t.me/";
const PRE_DEFAULT_LINK = "https://";

type Props = {
  editableInfoData: any[];
  setEditableInfoData: any;
  handleSaveInfoData: () => void;
  isEdit: boolean;
  isGettingSignature: boolean;
};

const CellEditInfoBlock: VFC<Props> = (props) => {
  const {
    editableInfoData,
    setEditableInfoData,
    handleSaveInfoData,
    isEdit,
    isGettingSignature,
  } = props;

  const handleInputsChange = (
    evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: {
        dataset: { fieldId },
        value,
      },
    } = evt;

    setEditableInfoData((prev: any) =>
      prev.map((field: any) => {
        if (field.id === fieldId) {
          return {
            ...field,
            value: value,
          };
        }

        return field;
      })
    );
  };

  return (
    <>
      <Wrapper>
        {editableInfoData.map(({ id, value, label, placeholder, link }) => {
          const getDefaultLink = (value: string) => {
            if (id === "link") {
              if (!value.includes("https://")) {
                return PRE_DEFAULT_LINK + value;
              }

              return value;
            }

            return value;
          };

          const currentLink =
            id === "tgName" ? PRE_TG_LINK + value : getDefaultLink(value);

          console.log(currentLink);

          if (id === "description") {
            return (
              <FieldWrapper key={id}>
                <Label>{label}</Label>
                {isEdit ? (
                  <DescriptionArea
                    data-field-id={id}
                    value={value}
                    onChange={handleInputsChange}
                  />
                ) : (
                  <div>{value}</div>
                )}
              </FieldWrapper>
            );
          }

          return (
            <FieldWrapper key={id}>
              <Label>{label}</Label>
              {isEdit ? (
                <Field
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  data-field-id={id}
                  onChange={handleInputsChange}
                  disabled={!isEdit}
                />
              ) : (
                <div>
                  <FieldValueLabel
                    href={currentLink}
                    target="_blank"
                    rel="noreferrel"
                  >
                    {id === "tgName" ? `@${value}` : value}
                  </FieldValueLabel>
                </div>
              )}
            </FieldWrapper>
          );
        })}
      </Wrapper>
      {isGettingSignature ? (
        <EditBtn>
          <Spin indicator={<LoadingOutlined style={{ color: "#fff" }} />} />
        </EditBtn>
      ) : (
        <EditBtn onClick={handleSaveInfoData}>
          {isEdit ? "SAVE" : "EDIT"}
        </EditBtn>
      )}
    </>
  );
};

export default CellEditInfoBlock;
