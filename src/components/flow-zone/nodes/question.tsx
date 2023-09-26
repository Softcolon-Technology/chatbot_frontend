import { css } from "@emotion/react";
import { MessageCircle } from "lucide-react";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import useStore from "../store";
import { QuestionNodeData } from "./typings";

const QuestionNode: FC<NodeProps<QuestionNodeData>> = ({ id }) => {
    const { getSourceConnectionAllowed, getNode } = useStore(
        (state) => ({ getSourceConnectionAllowed: state.allowSourceConnection, getNode: state.getNode })
    );

    const { data, selected } = getNode(id);
    const allowSourceConnection = getSourceConnectionAllowed(id);

    console.log({ data, selected, allowSourceConnection });


    return (
        <div
            css={css(
                css`
            border-radius: 8px;
            min-width: 240px;
            border: 1px solid lightblue;
          `,
                selected &&
                css`
              border: 1px solid coral;
            `
            )}
        >
            <div
                css={css`
            padding: 12px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid lightblue;
            background: aliceblue;
            border-radius: 8px 8px 0 0;
          `}
            >
                <p>Question</p>
                <MessageCircle height={18} width={18} />
            </div>
            <div
                css={css`
            background: white;
            padding: 12px 16px;
          `}
            >
                {data.question}
            </div>
            {
                data?.options?.map((_el) => (
                    <Handle
                        type="source"
                        isConnectable={allowSourceConnection}
                        isConnectableStart={allowSourceConnection}
                        position={Position.Right}
                        id="source"
                        style={{ background: '#000', top: 110 }}
                    />
                ))
            }
            <Handle
                type="source"
                isConnectable={allowSourceConnection}
                isConnectableStart={allowSourceConnection}
                position={Position.Right}
                id="source"
                style={{ background: '#000', top: 130 }}
            />
            <Handle
                type="source"
                isConnectable={allowSourceConnection}
                isConnectableStart={allowSourceConnection}
                position={Position.Right}
                id="source"
                style={{ background: '#000', top: 150 }}
            />
            <Handle
                type="source"
                isConnectable={allowSourceConnection}
                isConnectableStart={allowSourceConnection}
                position={Position.Right}
                id="source"
                style={{ background: '#000', top: 170 }}
            />
            <div css={css`
            background: white;
            padding: 12px 16px;
            border-radius: 0 0 8px 8px;
          `}>
                {data?.options?.map((_el) => (
                    <>
                        <div>{_el}</div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default QuestionNode