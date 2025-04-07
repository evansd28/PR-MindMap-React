export const getMaps = (userId: string) => {
    const key = `maps-${userId}`;
    return JSON.parse(localStorage.getItem(key) || "[]");
  };
  
