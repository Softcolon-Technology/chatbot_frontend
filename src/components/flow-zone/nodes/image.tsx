import { css } from "@emotion/react";
import { Image } from "lucide-react";
import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import CustomImage from "../../../shared/components/image";
import useStore from "../store";
import { ImageNodeData } from "./typings";

const ImageNode: FC<NodeProps<ImageNodeData>> = ({ id }) => {
  const { getSourceConnectionAllowed, getNode } = useStore(
    (state) => ({ getSourceConnectionAllowed: state.allowSourceConnection, getNode: state.getNode })
  );

  const { data, selected } = getNode(id);

  console.log('rerender')

  // check if the node is allowed to be connected to another node
  // not checking on target as target can have any no of connections
  const allowSourceConnection = getSourceConnectionAllowed(id);

  return (
    <>
      <Handle type="target" position={Position.Left} id="target"
        style={{ background: '#fff', boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }}

      />
      <div
        css={css(
          css`
            border-radius: 8px;
            min-width: 240px;
            border: 1px solid lightblue;
          `,
          selected &&
          css`
              border-color: coral;
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
          <p>Send Message</p>
          <Image height={18} width={18} />
        </div>
        <div
          css={css`
            background: white;
            padding: 12px 16px;
            border-radius: 0 0 8px 8px;
          `}
        >
          <CustomImage
            css={css`
              max-width: 300px;
              border-radius: 8px;
              max-height: 300px;
              object-fit: contain;
              margin-bottom: 12px;
            `}
            src={data.url}
            alt={data.caption}
          />
          {data.caption && <p css={css``}>{data.caption}</p>}
        </div>
      </div>
      <Handle
        type="source"
        isConnectable={allowSourceConnection}
        isConnectableStart={allowSourceConnection}
        position={Position.Right}
        id="source"
        style={{ background: '#fff', boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }}

      />
    </>
  );
};

export default ImageNode;
