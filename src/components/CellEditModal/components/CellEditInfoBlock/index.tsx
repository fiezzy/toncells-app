import { VFC, useState, useCallback, ChangeEvent } from "react";
import { message } from "antd";
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

type Props = {
  editableInfoData: any[];
  setEditableInfoData: any;
  handleSaveInfoData: () => void;
};

const CellEditInfoBlock: VFC<Props> = (props) => {
  const { editableInfoData, setEditableInfoData, handleSaveInfoData } = props;

  const [isInfoEdit, setIsInfoEdit] = useState(false);

  const toggleInfoEditMode = useCallback(() => {
    setIsInfoEdit((prev) => !prev);
  }, []);

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

  const handleSaveBtnClick = () => {
    if (isInfoEdit) {
      handleSaveInfoData();
      message.success("Successful editing!");
    }
    toggleInfoEditMode();
  };

  return (
    <>
      <Wrapper>
        {editableInfoData.map(({ id, value, label, placeholder, link }) => {
          const currentLink = id === "tgName" ? PRE_TG_LINK + value : value;

          if (id === "description") {
            return (
              <FieldWrapper key={id}>
                <Label>{label}</Label>
                {isInfoEdit ? (
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
              {isInfoEdit ? (
                <Field
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  data-field-id={id}
                  onChange={handleInputsChange}
                  disabled={!isInfoEdit}
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
      <EditBtn onClick={handleSaveBtnClick}>
        {isInfoEdit ? "SAVE" : "EDIT"}
      </EditBtn>
    </>
  );
};

export default CellEditInfoBlock;
