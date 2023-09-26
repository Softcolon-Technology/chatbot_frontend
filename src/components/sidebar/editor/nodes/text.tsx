import { css } from "@emotion/react";
import { ChangeEvent, FC, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { TextNode } from "../../../flow-zone/nodes/typings";
import useStore, { selector } from "../../../flow-zone/store";

const TextNodeDataEditor: FC<TextNode> = ({ id, type }) => {
  const { getNode, changeNodeData } = useStore(selector, shallow);

  const state = getNode(id);

  const onTextAreaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!state) return;

      changeNodeData({
        ...state,
        type,
        data: { ...state.data, [e.target.name]: e.target.value },
      });
    },
    [state, type, changeNodeData]
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
          name="text"
          value={state.data.text}
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
    </div>
  );
};

export default TextNodeDataEditor;
