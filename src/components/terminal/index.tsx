import { throttle } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createCombinedData } from "../../utils/helper";
import useStore from "../flow-zone/store";
import "./ResizableFooter.css"; // Create a CSS file for styling

const Terminal = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));
    const [isDragging, setIsDragging] = useState(false);
    const [footerHeight, setFooterHeight] = useState<number>(200);

    const startYRef = useRef(0);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseMove = useCallback(
        throttle((e: MouseEvent) => {
            if (!isDragging) return;

            const deltaY = startYRef.current - e.clientY;
            const newHeight = footerHeight + deltaY;

            const minHeight = 8;
            const maxHeight = 400;

            if (newHeight >= minHeight && newHeight <= maxHeight) {
                setFooterHeight(newHeight);
            }

            startYRef.current = e.clientY;
        }, 10),
        [footerHeight, isDragging]
    );

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        startYRef.current = e.clientY;
    };

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseUp, handleMouseMove]);

    return (
        <div className="resizable-footer">
            <div
                className="drag-handle"
                style={{ height: "8px", cursor: "ns-resize" }}
                onMouseDown={handleMouseDown}
            ></div>
            <div className="footer-content" style={{ height: `${footerHeight}px` }}>
                <pre>{JSON.stringify(createCombinedData(nodes, edges), null, 4)}</pre>
            </div>
        </div>
    );
};

export default React.memo(Terminal);
