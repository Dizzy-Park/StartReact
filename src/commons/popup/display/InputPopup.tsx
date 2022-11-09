import React, { useState } from "react";
import styled from "styled-components";
import { AbsPopupType } from "../AbsPopupType";
import { usePopupData } from "../store/absPopupHook";
import AbsPopup from "./AbsPopup";

function LabelComponent() {
  const InputLabel = styled.label`
    margin-bottom: 4px;
    font-weight: 400;
  `;
  return { InputLabel };
}

const BodyContiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex: 1;
`;

function InputPopup() {
  const { popupDo } = usePopupData<
    Array<{ id: string; text?: string; type: "textarea" | "input" }>
  >(AbsPopupType.INPUT);
  const { InputLabel } = LabelComponent();

  const [datas, setDatas] = useState<{ [key: string]: string }>({});

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const obj = datas;

    obj[id] = e.target.value;
    setDatas(obj);
  };

  return (
    <>
      <AbsPopup type={AbsPopupType.INPUT}>
        <BodyContiner>
          {popupDo!.data?.map(
            (item: {
              id: string;
              text?: string;
              type: "textarea" | "input";
            }) => {
              if (item.type === "textarea") {
                return (
                  <>
                    <InputLabel htmlFor={"input_" + item.id}>
                      {item.text}
                    </InputLabel>
                    <textarea
                      id={"input_" + item.id}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        changeHandler(e, item.id)
                      }
                      placeholder={item.text}
                      // size={{ height: "100px" }}
                    />
                  </>
                );
              } else {
                return (
                  <>
                    <label htmlFor={"input_" + item.id}>{item.text}</label>
                    <input
                      id={"input_" + item.id}
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        changeHandler(e, item.id)
                      }
                    ></input>
                  </>
                );
              }
            }
          )}
        </BodyContiner>
      </AbsPopup>
    </>
  );
}
export default InputPopup;
