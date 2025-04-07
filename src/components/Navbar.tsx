import { useState, useContext, useEffect } from "react";
import { getFirestore, doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { useAppContext } from "../context/Context";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";
import { saveMap } from "./saveMap";
import { getMaps } from "./getMaps";
import { deleteMap } from "./deleteMap";
import { v4 as uuidv4 } from "uuid";

export default function Navbar() {
  const { nodes, setNodes, selectedValue } = useAppContext();
  const { user } = useContext(AuthContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGetHelpOpen, setIsGetHelpOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactName, setContactName] = useState<string>("");
  const [savedContacts, setSavedContacts] = useState<{ name: string; number: string }[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [mapTitle, setMapTitle] = useState("");
  const [showMapsModal, setShowMapsModal] = useState(false);
  const [savedMaps, setSavedMaps] = useState<any[]>([]);

  const db = getFirestore();

  // Save Map
  const handleSaveMap = async () => {
    if (!user) return alert("You must be logged in.");
    if (!mapTitle.trim()) return alert("Please enter a map title.");

    const mapId = uuidv4();
    const mapData = {
      title: mapTitle,
      createdAt: Date.now(),
      nodes,
      selectedValue
    };

    try {
      await saveMap(user.uid, mapId, mapData);
      alert("✅ Map saved!");
      setMapTitle("");
      setShowSaveModal(false);
    } catch (err) {
      console.error("Error saving map:", err);
      alert("Something went wrong.");
    }
  };

  // View Maps
  const handleShowSavedMaps = async () => {
    if (!user) return;
    const maps = await getMaps(user.uid);
    setSavedMaps(maps);
    setShowMapsModal(true);
  };

  // Delete Map
  const handleDeleteMap = async (mapId: string) => {
    if (!user) return;
    const confirmed = confirm("Are you sure you want to delete this map?");
    if (!confirmed) return;

    try {
      await deleteMap(user.uid, mapId);
      const updatedMaps = savedMaps.filter((map) => map.id !== mapId);
      setSavedMaps(updatedMaps);
    } catch (error) {
      alert("Failed to delete map.");
    }
  };

  // Help Content
  const defaultZip = "15224";
  const city = "pittsburgh-pa";

  const findHelpCategories = {
    Food: [
      { name: "Emergency Food", slug: "emergency-food" },
      { name: "Food Delivery", slug: "food-delivery" },
      { name: "Food Pantry", slug: "food-pantry" },
      { name: "Help Pay for Food", slug: "help-pay-for-food" },
      { name: "Meals", slug: "meals" },
      { name: "Nutrition Education", slug: "nutrition-education" },
    ],
    Housing: [
      { name: "Help Find Housing", slug: "help-find-housing" },
      { name: "Housing Advice", slug: "housing-advice" },
      { name: "Maintenance & Repairs", slug: "maintenance-%26-repairs" },
      { name: "Residential Housing", slug: "residential-housing" },
      { name: "Temporary Shelter", slug: "temporary-shelter" },
    ],
    Goods: [
      { name: "Baby Supplies", slug: "baby-supplies" },
      { name: "Clothing", slug: "clothing" },
      { name: "Home Goods", slug: "home-goods" },
      { name: "Personal Safety", slug: "personal-safety" },
      { name: "Toys & Gifts", slug: "toys-%26-gifts" },
    ],
    Health: [
      { name: "Medical Supplies", slug: "medical-supplies" },
      { name: "Addiction & Recovery", slug: "addiction-%26-recovery" },
      { name: "Dental Care", slug: "dental-care" },
      { name: "Health Education", slug: "health-education" },
      { name: "Help Pay for Healthcare", slug: "help-pay-for-healthcare" },
      { name: "Medical Care", slug: "medical-care" },
      { name: "Mental Health Care", slug: "mental-health-care" },
      { name: "Sexual & Reproductive Health", slug: "sexual-and-reproductive-health" },
      { name: "Vision Care", slug: "vision-care" },
    ],
    Transit: [
      { name: "Help Pay for Transit", slug: "help-pay-for-transit" },
      { name: "Transportation", slug: "transportation" },
    ],
    Money: [
      { name: "Financial Assistance", slug: "financial-assistance" },
      { name: "Financial Education", slug: "financial-education" },
      { name: "Government Benefits", slug: "government-benefits" },
      { name: "Insurance", slug: "insurance" },
      { name: "Loans", slug: "loans" },
      { name: "Tax Preparation", slug: "tax-preparation" },
    ],
    Care: [
      { name: "Adoption & Foster Care", slug: "adoption-%26-foster-care" },
      { name: "Animal Welfare", slug: "animal-welfare" },
      { name: "Community Support Services", slug: "community-support-services" },
      { name: "Daytime Care", slug: "daytime-care" },
      { name: "End-of-Life Care", slug: "end-of-life-care" },
      { name: "Navigating the System", slug: "navigating-the-system" },
      { name: "Physical Safety", slug: "physical-safety" },
      { name: "Residential Care", slug: "residential-care" },
      { name: "Support Network", slug: "support-network" },
    ],
    Education: [
      { name: "Help Find School", slug: "help-find-school" },
      { name: "Help Pay for School", slug: "help-pay-for-school" },
      { name: "More Education", slug: "more-education" },
      { name: "Preschool", slug: "preschool" },
      { name: "Screening & Exams", slug: "screening-%26-exams" },
    ],
    Work: [
      { name: "Skills & Training", slug: "skills-%26-training" },
      { name: "Help Find Work", slug: "help-find-work" },
      { name: "Help Pay for Work Expenses", slug: "help-pay-for-work-expenses" },
      { name: "Supported Employment", slug: "supported-employment" },
      { name: "Workplace Rights", slug: "workplace-rights" },
    ],
    Legal: [
      { name: "Advocacy & Legal Aid", slug: "advocacy-%26-legal-aid" },
      { name: "Mediation", slug: "mediation" },
      { name: "Representation", slug: "representation" },
      { name: "Translation & Interpretation", slug: "translation-%26-interpretation" },
    ],
  };

  const categoryMapping: Record<string, string> = {
    "Financial Security": "Money",
    "Social Security": "Legal",
    "Job Skills": "Work",
    "Family Oriented-Skills": "Care",
    "Physical Health": "Health",
    "Mental Health": "Health",
    "Supporting Loved Ones": "Care",
    "Supported Others Like Us": "Community Support Services",
  };
  const filteredCategories =
    selectedValue && selectedValue.text in categoryMapping
      ? { [categoryMapping[selectedValue.text]]: findHelpCategories[categoryMapping[selectedValue.text]] }
      : findHelpCategories;

  const generateFindHelpURL = (category: string, slug: any) =>
    `https://findhelp.org/${category.toLowerCase()}/${slug}--${city}?postal=${defaultZip}`;

  const handleCategoryClick = (category: string, slug: string) => {
    setSelectedCategory(slug);
    setIframeUrl(generateFindHelpURL(category, slug));
  };

  const handleGetHelpClose = () => {
    setIsGetHelpOpen(false);
    setIframeUrl("");
    setSelectedCategory(null);
    setPhoneNumber("");
    setPhoneError("");
  };

  const fetchContacts = async () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      if (data.contacts) setSavedContacts(data.contacts);
    }
  };

  const handleSavePhoneNumber = async () => {
    if (!user || !contactName || !phoneNumber) return alert("Enter name and number.");
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    const newContact = { name: contactName, number: phoneNumber };
    if (cleanedNumber.length === 10) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { contacts: arrayUnion(newContact) });
        alert("Contact saved!");
        setContactName("");
        setPhoneNumber("");
        fetchContacts();
      } catch (error: any) {
        if (error.code === "not-found") {
          await setDoc(doc(db, "users", user.uid), { contacts: [newContact] });
          alert("Contact saved!");
          setContactName("");
          setPhoneNumber("");
          fetchContacts();
        } else {
          console.error("Error saving contact:", error);
        }
      }
    } else {
      setPhoneError("Phone number must be 10 digits.");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  return (
    <div className="flex flex-row bg-orange-500 text-white p-2 text-lg h-12 absolute w-screen z-10 shadow-lg">
      <div className="flex flex-row gap-4">
        <h1 className="font-semibold">STRIVE</h1>
        <p className="hover:underline cursor-pointer" onClick={() => setIsDialogOpen(true)}>How to Use</p>
        <p className="hover:underline cursor-pointer" onClick={() => setIsGetHelpOpen(true)}>Browse Resources</p>
        {user && (
          <>
            <button onClick={() => setShowSaveModal(true)} className="bg-green-600 text-white px-3 py-1 ml-4 rounded hover:bg-green-700">💾 Save Map</button>
            <button onClick={handleShowSavedMaps} className="bg-blue-600 text-white px-3 py-1 ml-2 rounded hover:bg-blue-700">📂 My Maps</button>
            <Logout />
          </>
        )}
      </div>

      {/* 💾 Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-center">Name Your Map</h2>
            <input
              type="text"
              value={mapTitle}
              onChange={(e) => setMapTitle(e.target.value)}
              placeholder="e.g. Career Plan"
              className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
            />
            <div className="flex justify-between gap-2">
              <button onClick={() => setShowSaveModal(false)} className="bg-red-500 text-white px-4 py-2 rounded w-1/2">Cancel</button>
              <button onClick={handleSaveMap} className="bg-green-600 text-white px-4 py-2 rounded w-1/2">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* 📂 View + Load + Delete Maps Modal */}
      {showMapsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl w-[500px] max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4 text-center">📂 Your Saved Maps</h2>
            {savedMaps.length === 0 ? (
              <p className="text-gray-700">You have no saved maps yet.</p>
            ) : (
              <ul className="space-y-2">
                {savedMaps.map((map) => (
                  <li key={map.id} className="border p-3 rounded shadow-sm">
                    <p className="font-medium text-black">{map.title}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          setNodes(map.nodes);
                          setShowMapsModal(false);
                          const root = map.nodes.find((node: any) => node.nodeType === "value");
                          if (root) {
                            selectedValue.id = root.id;
                            selectedValue.text = root.text;
                            selectedValue.position = root.position;
                            selectedValue.nodeType = root.nodeType;
                            selectedValue.childNodes = root.childNodes;
                          }
                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleDeleteMap(map.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowMapsModal(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded w-full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
