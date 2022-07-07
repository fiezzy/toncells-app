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

const initialData = [
  {
    id: "tgName",
    value: "toncells",
    label: "TELEGRAM NAME:",
    placeholder: "@name",
    link: "https://t.me/",
  },
  {
    id: "link",
    value: "https://app.toncells.org/",
    label: "LINK:",
    placeholder: "https://name.com",
    link: "https://t.me/",
  },
  {
    id: "description",
    value:
      "This item gives you an access to edit cell #260 of TonCells Project. TonCells is a 100x100 celled field where each cell can be edited. Make your unique NFT even more unique by customizing it how you want. Draw, add pictures & videos, edit your own description and mainly do whatever you want! This item gives you x% discount for the next purchase. / This item doesn't give you any discount.",
    label: "DESCRIPTION:",
    placeholder: "write your description in this field",
  },
];

const CellEditInfoBlock: VFC = () => {
  const [fieldsData, setFieldsData] = useState(initialData);
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

    setFieldsData((prev) =>
      prev.map((field) => {
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
        {fieldsData.map(({ id, value, label, placeholder, link }) => {
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

          console.log(currentLink);

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
      <EditBtn
        onClick={() => {
          toggleInfoEditMode();
          isInfoEdit && message.success("Successful editing!");
        }}
      >
        {isInfoEdit ? "SAVE" : "EDIT"}
      </EditBtn>
    </>
  );
};

export default CellEditInfoBlock;
