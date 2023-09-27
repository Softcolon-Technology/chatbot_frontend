import { useState } from "react";

import {
    AnnotationType,
    Colors,
    Enabled,
    PageFitMode
} from "basicprimitives";
import { OrgDiagram } from "basicprimitivesreact";
import { useNavigate } from "react-router-dom";

interface PhotoMap {
    [key: string]: string;
}

interface Item {
    id: number;
    parent: number | null;
    title: string;
    description: string;
    color?: string;
    image: string;
}

interface Annotation {
    annotationType: any;
    items: number[];
    color: any;
    lineWidth: number;
    opacity: number;
    showArrows: boolean;
}



const photos: PhotoMap = {
    a:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAIAAACrV36WAAAAAXNSR0IArs4c6QAAAARn" +
        "QU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGnSURBVGhD7dnBbQJBDAVQk1o2QjlQwKYGzpSwKQfq4IxIC" +
        "RTB9jLZHCJFwWv7/7EiDt6zmX2yPYMHNq01eb7n5flI36JiIXWpbFW2kAwgsdVblS0kA0hs9db/ZWs+vW/Wno9PxPE3dh" +
        "ls6Od+HI1XT1d64Sb8R5utEulwdbA8VY+LZ/kqkfF456pBHxDz5Xxze/p2vsxukBbAshTVOE0PO4B2cUlWKrgUTKsrV0e" +
        "ut3RVU/cm5aKKqPXVbjuIDPtDUh2JImq1+jmjkupIFNFStXadHncWXkecpb3393me4oJZnionXyjLV6W4QFZEleHCWNG+" +
        "0eKggQJiRVV6vhAXwoqrul0AC1H1uuIsTLUyukYH1jBL7WJ8lgq6oqwkVXSQDrLSVEFXjJWoirlCrFRVyBVhJasirgCr6" +
        "5tEv7a5A5jL0tcN7vNl9OVcHqtXRbocVr+Kc9k3H/3qPL69Ise7dh0SsS+2JmtFddgvdy/gGbY7Jdp2GRcyrlu1BfUjxt" +
        "iPRm/lqVbGHOMHnU39zQm0I/UbBLA+GVosJHGVrcoWkgEktnoLydYXkF/LiXG21MwAAAAASUVORK5CYII=",
};

function OrgChart() {
    const navigate = useNavigate()
    interface TreeTypes {
        id: number;
        parent: number | null;
        title: string;
        color?: string;
        image: string;
    }

    const [treeData, setTreeData] = useState<TreeTypes[]>(dummyData);


    const config: any = {
        hideGrandParentsConnectors: false,
        pageFitMode: PageFitMode.AutoSize,
        autoSizeMinimum: { width: 100, height: 100 },
        autoSizeMaximum: { width: 2000, height: 768 },
        cursorItem: 0,
        highlightItem: 0,
        hasSelectorCheckbox: Enabled.False,
        items: treeData,
        annotations: [
            {
                annotationType: AnnotationType.HighlightPath,
                items: [5, 0],
                color: Colors.Purple,
                lineWidth: 2,
                opacity: 1,
                showArrows: false,
            },
            {
                annotationType: AnnotationType.HighlightPath,
                items: [4, 0],
                color: Colors.Red,
                lineWidth: 2,
                opacity: 1,
                showArrows: true,
            },
        ],
        defaultTemplateName: "CheckboxTemplate",
        templates: [
            {
                name: "CheckboxTemplate",
                itemSize: { width: 200, height: 66 },
                minimizedItemSize: { width: 3, height: 3 },
                highlightPadding: { left: 0, top: 0, right: 0, bottom: 0 },
                isActive: false,
                onItemRender: ({
                    context: itemConfig,
                    isSelected,
                }: {
                    context: Item;
                    isSelected: boolean;
                }) => {
                    return (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: itemConfig?.color || "inherit",
                                    height: "inherit",
                                    border: "1px solid black",
                                    gap: 10
                                }}
                            >
                                <div style={{ flexShrink: 0 }}>
                                    <img
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                        src={itemConfig.image}
                                        alt="Neil image"
                                    />
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <p
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "500",
                                            color: "#000",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            margin: 0
                                        }}
                                    >
                                        {itemConfig.title}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "0.5rem",
                                            color: itemConfig?.color ? "#000" : "#ccc",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            margin: 0
                                        }}
                                    >
                                        {itemConfig.description}
                                    </p>
                                </div>
                            </div >
                        </>
                    );
                },
            },
        ],
    };

    return (
        <div >
            <button onClick={() => navigate("/")}>Back</button>
            <OrgDiagram centerOnCursor config={config} />
        </div>
    );
}

export default OrgChart;

const dummyData = [
    {
        id: 0,
        parent: null,
        title: "kaushik bhai",
        description: "CEO",
        color: "red",
        image:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    },
    {
        id: 1,
        parent: 0,
        title: "ankit",
        description: "Manager",
        color: "purple",
        image:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    },
    {
        id: 2,
        parent: 0,
        title: "sahil",
        description: "Manager",
        color: "purple",
        image:
            "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    },
    {
        id: 3,
        parent: 1,
        title: "chetan",
        description: "Foreman",
        image:
            "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
    },
    {
        id: 4,
        parent: 1,
        title: "harsh",
        description: "Foreman",
        image:
            "https://images.unsplash.com/photo-1596075780750-81249df16d19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
        id: 5,
        parent: 2,
        title: "Ted Lucas",
        description: "Foreman",
        image:
            "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
        id: 6,
        parent: 2,
        title: "Fritz Stuger",
        description: "Foreman",
        image:
            "https://images.unsplash.com/photo-1569128782402-d1ec3d0c1b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
    },
];