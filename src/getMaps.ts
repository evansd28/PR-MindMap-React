type Node = {
  id: string;
  text: string;
  nodeType: string;
  image?: string;
  video?: string;
  position: { x: number; y: number };
  childNodes?: Node[];
};

type MapData = {
  id: string;
  title: string;
  createdAt: number;
  nodes: Node[];
  selectedValue: Node;
};

export const getMaps = (userId: string): MapData[] => {
  const key = `maps-${userId}`;
  const stored = localStorage.getItem(key);
  try {
    return stored ? JSON.parse(stored) as MapData[] : [];
  } catch (err) {
    console.error("Failed to parse maps from localStorage:", err);
    return [];
  }
};