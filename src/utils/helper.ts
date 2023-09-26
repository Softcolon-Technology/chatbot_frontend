export function createCombinedData(nodes, edges) {
    const combinedData = {
        nodes: nodes.map(node => ({
            id: node.id,
            data: node.data,
            type: node.type,
            edges: edges.filter(edge => edge.source === node.id).map(edge => ({
                target: edge.target
            })),
        })),
    };
    return combinedData;
}