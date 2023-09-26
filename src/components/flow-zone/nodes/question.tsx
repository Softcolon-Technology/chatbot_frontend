import { css } from '@emotion/react';
import { MessageCircle } from 'lucide-react';
import { FC } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import useStore from '../store';
import { QuestionNodeData } from './typings';

interface Props extends NodeProps<QuestionNodeData> {
    options: string[]; // Array of dynamic options
}

const QuestionNode: FC<Props> = ({ id }) => {
    const { getSourceConnectionAllowed, getNode } = useStore(
        (state) => ({
            getSourceConnectionAllowed: state.allowSourceConnection,
            getNode: state.getNode,
        })
    );

    const { data, selected } = getNode(id);

    return (
        <div
            css={css`
        border-radius: 8px;
        min-width: 240px;
        background: white;
        border: 1px solid lightblue;
        ${selected &&
                css`
          border: 1px solid coral;
        `}
      `}
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
            {data.options &&
                data.options.map((option, index) => (
                    <div key={index} css={css`
     position: relative;
          padding:4px;
          padding-inline: 10px;
          margin: 4px;
          border-radius: 50px;
     background: #e5e5e5;
                    `}>
                        <div css={css`
     position: relative;

        `} >{option}</div>
                        <Handle
                            key={index}
                            type="source"
                            // isConnectable={allowSourceConnection}
                            // isConnectableStart={allowSourceConnection}
                            position={Position.Right}
                            id={`source-${index}`}
                            style={{ background: '#fff', top: "50%", right: 10, boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }}
                        />
                    </div>
                ))}
            {/* <div
                css={css`
          background: white;
          padding: 12px 16px;
          border-radius: 0 0 8px 8px;
        `}
            >
                {data.options &&
                    data.options.map((option, index) => (
                        <div key={index}>{option}</div>
                    ))}
            </div> */}
        </div>
    );
};

export default QuestionNode;
