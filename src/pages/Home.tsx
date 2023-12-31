import { css } from "@emotion/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactFlowProvider } from "reactflow";
import FlowZone from "../components/flow-zone";
import { NodeTypes } from "../components/flow-zone/nodes/typings";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { Styles } from "../components/styles";
import Terminal from "../components/terminal";


function Home() {
    const nodes = [
        {
            id: NodeTypes.Text,
            label: "Text Message",
            type: NodeTypes.Text,
        },
        {
            id: NodeTypes.Image,
            label: "Image Message",
            type: NodeTypes.Image,
        },
        {
            id: NodeTypes.Question,
            label: "Question",
            type: NodeTypes.Question
        }
    ];

    return (
        <>
            <Styles />
            <div
                css={css`
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
        `}
            >
                <Header />
                <DndProvider backend={HTML5Backend}>
                    <ReactFlowProvider>
                        <div
                            css={css`
                display: grid;
                grid-template-columns: 3fr 1fr;
                grid-auto-rows: 1fr;
                flex: 1;
              `}
                        >
                            <FlowZone />
                            <Sidebar nodes={nodes} />
                        </div>
                        <Terminal />
                    </ReactFlowProvider>

                </DndProvider>
            </div>
        </>
    );
}

export default Home;
