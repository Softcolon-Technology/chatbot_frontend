import { css } from "@emotion/react";
import { XIcon } from "lucide-react";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { shallow } from "zustand/shallow";
import { QuestionNode } from "../../../flow-zone/nodes/typings";
import useStore, { selector } from "../../../flow-zone/store";

const QuestionNodeDataEditor: FC<QuestionNode> = ({ type, id }) => {

    const { getNode, changeNodeData, addOption } = useStore(selector, shallow);
    const [option, setOption] = useState<string>("")

    const state = getNode(id);

    console.log({ state, option });


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
        () => {
            console.log({ ...state.data, ["options"]: [...state.data.options, option] }, option);
            if (option.length == 0) {
                return alert("add option first")
            }
            if (!state) return;

            addOption({
                ...state,
                type,
                data: { ...state.data, ["options"]: [...state.data.options, option] },
            });
            setOption("")
        },
        [state, option, addOption, type]
    );

    const removeOption = useCallback((index) => {
        console.log({ index });

        const newData = state.data.options.findIndex((_el, _index) => _index == index)

        const newOption = state.data.options.filter((_el, index) => index != newData)
        console.log({ newData, newOption });
        addOption({
            ...state,
            type,
            data: { ...state.data, ["options"]: newOption },
        });

    }, [addOption, state, type])

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
          `}
                />
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
          `}
                />
            </div>
            <div css={
                css`
                margin-top: 10px;
                margin-bottom: 10px;
                `
            }>
                {
                    state.data.options.map((_el, index) => (
                        <div css={
                            css`
                            position: relative
                            `
                        }>

                            <div css={css`
                        background: #e5e5e5;
                        margin-top: 4px;
                        padding: 4px;
                        padding-inline: 10px;
                        border-radius: 50px;
                        `}>{_el}</div>
                            <XIcon style={{ position: "absolute", top: "0px", right: "0px" }} onClick={() => {
                                removeOption(index)
                            }} />
                        </div>
                    ))
                }
            </div>

            <button onClick={onAddOption}>Add Option</button>
        </div>
    );
};

export default QuestionNodeDataEditor