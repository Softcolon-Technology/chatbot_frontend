export function createCombinedData(nodes, edges) {
    const combinedData = {
        nodes: nodes.map(node => ({
            id: node.id,
            position: node.position,
            data: node.data,
            type: node.type,
            width: node.width,
            height: node.height,
            selected: node.selected,
            dragging: node.dragging,
            positionAbsolute: node.positionAbsolute,
            edges: edges.filter(edge => edge.source === node.id).map(edge => ({
                animated: edge.animated,
                source: edge.source,
                sourceHandle: edge.sourceHandle,
                target: edge.target,
                targetHandle: edge.targetHandle,
                id: edge.id,
            })),
        }))
    };
    return combinedData;
}