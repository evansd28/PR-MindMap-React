import AudioRecorder from "./AudioRecorder";

export default function Navbar() {
  return (
    <div
      className={`flex flex-row bg-orange-500 text-white p-2 text-lg h-12 absolute w-screen z-10 shadow-lg`}
    >
      <div className={`flex flex-row gap-4`}>
        <h1 className="font-semibold">Mind Map</h1>
        <p className="hover:underline cursor-pointer">How to use</p>
      </div>
      <div className="ml-auto flex items-center">
        <AudioRecorder />
      </div>
    </div>
  );
}
