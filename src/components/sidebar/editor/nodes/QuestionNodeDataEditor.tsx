import { css } from "@emotion/react";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { shallow } from "zustand/shallow";
import { QuestionNode } from "../../../flow-zone/nodes/typings";
import useStore, { selector } from "../../../flow-zone/store";

export const QuestionNodeDataEditor: FC<QuestionNode> = ({ type, id }) => {

    const { getNode, changeNodeData, addOption } = useStore(selector, shallow);
    const [option, setOption] = useState<string>("");

    const state = getNode(id);

    console.log({ state });


    const onTextAreaChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            console.log({
                ...state,
                type,
                data: { ...state.data, [e.target.name]: e.target.value },
            });
            if (!state) return;

            changeNodeData({
                ...state,
                type,
                data: { ...state.data, [e.target.name]: e.target.value },
            });
        },
        [state, type, changeNodeData]
    );

    const onAddOption = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            console.log({
                ...state,
                type,
                data: { ...state.data, [e.target.name]: e.target.value },
            });
            if (!state) return;

            addOption({
                ...state,
                type,
                data: { ...state.data, ["options"]: [...state.data.options, option] },
            });
        },
        [state, type, addOption]
    );

    return (
        <div
            css={css`
        padding: 16px 28px;
        border-bottom: 1px solid lightblue;
        font-weight: 500;
      `}
        >
            <div>
                <label
                    htmlFor="text"
                    css={css`
            font-weight: 400;
          `}
                >
                    Text
                </label>
                <textarea
                    name="question"
                    value={state.data.question}
                    onChange={onTextAreaChange}
                    css={css`
            margin-top: 16px;
            padding: 8px 12px;
            border-radius: 4px;
            font-weight: 400;
            border: 1px solid lightblue;
            width: 100%;
            height: 100px;
          `} />
            </div>

            <div>
                <label htmlFor="options"
                    css={css`
            font-weight: 400;
          `}>Option</label>
                <input
                    name="options"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    css={css`
            margin-top: 16px;
            padding: 8px 12px;
            border-radius: 4px;
            font-weight: 400;
            border: 1px solid lightblue;
            width: 100%;
            height: 100px;
          `} />
            </div>

            {state.data.options.map((_el) => (
                <div>{_el}</div>
            ))}

            <button onClick={onAddOption}>Add Option</button>
        </div>
    );
};
