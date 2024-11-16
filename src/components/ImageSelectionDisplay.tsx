import { useState } from "react";
import { ImageSelectionDisplayProps } from "../Types/types";

export default function ImageSelectionDisplay({ 
    addImageToNode, 
    setMediaDisplay, 
    setImageSelectionDisplay, 
    activeNodeId 
}: ImageSelectionDisplayProps) {
    const [searchQuery, setSearchQuery] = useState<string | undefined>();
    const [imageGallery, setImageGallery] = useState<string[]>([]);

    const apiKey = '46834432-8a53092628e33a278a1baf5c7';

    const handleAddImage = async (searchQuery: string | undefined) => {
        setImageGallery([]);
        if (searchQuery) {
            const images = await searchForImage(searchQuery);
            images.map((image: { previewURL: string }) => {
                setImageGallery(prev => [...prev, image.previewURL])
            })
        }
        setImageSelectionDisplay(true);
        setMediaDisplay(false);
    }

    const searchForImage = async (query: string | null) => {
        if (!query) return [];
        console.log("searching...")
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=20`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.hits;
        } catch (e) {
            console.error("Error fetching image: ", e);
            return [];
        }
    }

    return (
        <div className='flex justify-center'>
            <div
                className="media-display absolute rounded-xl border-2 border-black w-1/3 m-auto bg-gray-200 p-2"
                style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 50
                }}
            >
                <div className="flex justify-center gap-2">
                    <input
                        type="text"
                        placeholder="Search for image..."
                        className="p-2 text-black rouneded border-2 border-gray-400 rounded w-48"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="bg-orange-500 hover:bg-orange-400 text-white rounded p-2"
                        onClick={() => handleAddImage(searchQuery)}
                    >
                        Search
                    </button>
                </div>
                <div className='grid grid-cols-5'>
                    {imageGallery.map((image) => {
                        return (
                            <button
                                className='p-2'
                                onClick={() => addImageToNode(activeNodeId, image)}>
                                <img
                                    src={image}
                                    className='w-32 h-20 rounded-md border-2 border-black'
                                    alt="Gallery Image"
                                />
                            </button>
                        )
                    })}
                </div>
                <div className='flex justify-center'>
                    <button
                        className='bg-orange-500 w-1/4 hover:bg-orange-400 text-white rounded p-2 mt-2'
                        onClick={() => setImageSelectionDisplay(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}