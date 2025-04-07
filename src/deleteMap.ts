export const deleteMap = (userId: string, mapId: string) => {
    const key = `maps-${userId}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const updated = existing.filter((map: any) => map.id !== mapId);
    localStorage.setItem(key, JSON.stringify(updated));
  };
  
