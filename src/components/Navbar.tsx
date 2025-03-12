import { useState } from "react";

export default function Navbar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGetHelpOpen, setIsGetHelpOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);
  const handleGetHelpClose = () => setIsGetHelpOpen(false);

  const defaultZip = "15224"; // Default ZIP code
  const city = "pittsburgh-pa"; // Default city

  const findHelpCategories = {
    food: [
      "emergency-food",
      "food-delivery",
      "food-pantry",
      "help-pay-for-food",
      "meals",
      "nutrition-education",
    ],
    housing: [
      "help-find-housing",
      "housing-advice",
      "maintenance-%26-repairs",
      "residential-housing",
      "temporary-shelter",
    ],
    money: [
      "financial-assistance",
      "financial-education",
      "government-benefits",
      "insurance",
      "loans",
      "tax-preparation",
    ],
  };

  // Generates the correct FindHelp.org URL
  const generateFindHelpURL = (category, subcategory) =>
    `https://findhelp.org/${category}/${subcategory}--${city}?postal=${defaultZip}`;

  const handleCategoryClick = (category, subcategory) => {
    const url = generateFindHelpURL(category, subcategory);
    setIframeUrl(url);
    setIsGetHelpOpen(true);
  };

  return (
    <div className="flex flex-row bg-orange-500 text-white p-2 text-lg h-12 absolute w-screen z-10 shadow-lg">
      <div className="flex flex-row gap-4">
        <h1 className="font-semibold">STRIVE</h1>
        <p className="hover:underline cursor-pointer" onClick={handleDialogOpen}>
          How to use
        </p>
        <p
          className="hover:underline cursor-pointer"
          onClick={() => setIsGetHelpOpen(true)}
        >
          Browse Resources
        </p>
      </div>

      {/* Help Modal */}
      {isGetHelpOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-xl border-4 border-gray-300 shadow-lg text-black w-[700px]">
            <h2 className="text-xl font-semibold mb-4 text-center">Get Help</h2>
            {/* Buttons for resource categories */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {Object.entries(findHelpCategories).map(([category, subcategories]) =>
                subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    onClick={() => handleCategoryClick(category, subcategory)}
                  >
                    {subcategory.replace(/-/g, " ")}
                  </button>
                ))
              )}
            </div>
            {/* Display the iframe if a URL is selected */}
            {iframeUrl && (
              <iframe
                src={iframeUrl}
                width="100%"
                height="400"
                title="FindHelp Resources"
              />
            )}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded flex m-auto"
              onClick={handleGetHelpClose}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-xl border-4 border-gray-300 shadow-lg text-black">
            <h2 className="text-xl font-semibold mb-4 text-center">How to use</h2>
            <ul className="list-disc list-inside">
              <li>Select a node from the left sidebar and click on the canvas to add it.</li>
              <li>Click on a node to edit its text or add an image or video.</li>
              <li>Click on the "Start Recording" button to record audio.</li>
              <li>You can also click on the node to move around the map.</li>
            </ul>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded flex m-auto"
              onClick={handleDialogClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
