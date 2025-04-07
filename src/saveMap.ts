export const saveMap = (userId: string, mapId: string, mapData: any) => {
    const key = `maps-${userId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
  
    const updated = [...existing, { id: mapId, ...mapData }];
    localStorage.setItem(key, JSON.stringify(updated));
  };
  
