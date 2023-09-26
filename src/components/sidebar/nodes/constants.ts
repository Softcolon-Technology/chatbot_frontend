import { FileImage, FileText } from "lucide-react";
import { NodeTypes } from "../../flow-zone/nodes/typings";

export const labelsMap = {
  [NodeTypes.Text]: "Text",
  [NodeTypes.Image]: "Image",
  [NodeTypes.Question]: "Question"
};

export const iconsMap = {
  [NodeTypes.Text]: FileText,
  [NodeTypes.Image]: FileImage,
  [NodeTypes.Question]: FileImage
};

export const nodeDefaultStates = {
  [NodeTypes.Text]: {
    data: { text: "Hello World" },
  },
  [NodeTypes.Image]: {
    data: {
      url: "https://picsum.photos/200/300",
      caption: "Random image",
    },
  },
  [NodeTypes.Question]: {
    data: {
      question: "What is it?",
      options: ["Test", "Test2", "Test3", "Test4"]
    }
  }
};
