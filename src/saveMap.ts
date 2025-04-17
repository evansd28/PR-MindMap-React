// Helper: Flattens nodes recursively
const flattenNodes = (node: any): any[] => {
  let all = [node];
  if (node.childNodes && node.childNodes.length > 0) {
    for (const child of node.childNodes) {
      all = all.concat(flattenNodes(child));
    }
  }
  return all;
};

// Save function
export const saveMap = (userId: string, mapId: string, selectedValue: any, title: string) => {
  const key = `maps-${userId}`;
  const existing = JSON.parse(localStorage.getItem(key) || "[]");

  const allNodes = flattenNodes(selectedValue);

  const newMap = {
    id: mapId,
    title,
    createdAt: Date.now(),
    selectedValue,
    nodes: allNodes,
  };

  const updated = [
    ...existing.filter((m: { id: string }) => m.id !== mapId),
    newMap
  ];

  localStorage.setItem(key, JSON.stringify(updated));
  console.log("✅ Map saved:", newMap);
};
