import { Node } from "reactflow";

export enum NodeTypes {
  Text = "text",
  Image = "image",
  Question = "question"
}

export interface TextNodeData {
  text: string;
}

export interface ImageNodeData {
  caption: string;
  url: string;
}

export interface OptionData {
  option: string;
  position: number
}

export interface QuestionNodeData {
  question: string,
  options: OptionData[]
}

export interface TextNode extends Node<TextNodeData, NodeTypes.Text> {
  type: NodeTypes.Text;
}

export interface ImageNode extends Node<ImageNodeData, NodeTypes.Image> {
  type: NodeTypes.Image;
}

export interface QuestionNode extends Node<QuestionNodeData, NodeTypes.Question> {
  type: NodeTypes.Question
}

export type Nodes = TextNode | ImageNode | QuestionNode;

export type NodeData = TextNodeData | ImageNodeData | QuestionNodeData;
