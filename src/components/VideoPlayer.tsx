export default function VideoPlayer({ video, setVideoPlayer }: {video: string | undefined, setVideoPlayer: (display: boolean) => void}) {
    // Extract video ID from the YouTube URL
    const videoId = video?.split('v=')[1]?.split('&')[0];
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="max-h-screen bg-white rounded-lg p-5">
                <iframe
                    width="800px"
                    height="400px"
                    src={embedUrl} // Use the embed URL
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <button onClick={() => setVideoPlayer(false)} className="mt-4 bg-red-500  text-white font-bold py-2 px-4 rounded flex m-auto">
                    Close
                </button>
            </div>
        </div>
    )
}