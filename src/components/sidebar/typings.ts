import { NodeTypes } from "../flow-zone/nodes/typings";

export interface TextNodeDataEditorState {
  type: NodeTypes.Text;
  data: { text: string };
}

export interface QuestionDataEditorState {
  type: NodeTypes.Question;
  data: {
    question: string,
    options: string[]
  }
}

export interface ImageNodeDataEditorState {
  type: NodeTypes.Image;
  data: { url: string; caption: string };
}

export type NodeDataEditorState =
  | TextNodeDataEditorState
  | ImageNodeDataEditorState
  | QuestionDataEditorState;
