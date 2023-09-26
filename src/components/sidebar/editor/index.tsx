import { FC } from "react";
import { Nodes, NodeTypes } from "../../flow-zone/nodes/typings";
import ImageNodeDataEditor from "./nodes/image";
import QuestionNodeDataEditor from "./nodes/question";
import TextNodeDataEditor from "./nodes/text";

// A component which renders the specific editor for the selected node
const NodeDataEditor: FC<{ node: Nodes }> = ({ node }) => {

  // Individual node data editors handle their own state and save it as needed
  switch (node.type) {
    case NodeTypes.Image:
      return <ImageNodeDataEditor {...node} />;
    case NodeTypes.Text:
      return <TextNodeDataEditor {...node} />;
    case NodeTypes.Question:
      return <QuestionNodeDataEditor  {...node} />;
    default:
      return null;
  }
};

export default NodeDataEditor;
