import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAppContext } from "../context/Context";
import { saveMap } from "../saveMap";
import { v4 as uuidv4 } from "uuid";

export default function SaveMapButton() {
  const { user } = useContext(AuthContext);
  const { nodes, selectedValue } = useAppContext();

  const handleSave = async () => {
    if (!user) return alert("You must be logged in to save a map.");

    const mapId = uuidv4();
    const mapData = {
      title: "My Mind Map",
      createdAt: Date.now(),
      nodes,
      selectedValue
    };

    try {
      await saveMap(user.uid, mapId, selectedValue, mapData.title);
      alert("✅ Map saved successfully!");
    } catch (err) {
      console.error("❌ Failed to save map:", err);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <button
      onClick={handleSave}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
    >
      💾 Save Map
    </button>
  );
}
