import { useState, useEffect } from 'react'

function App() {
  const [videoUrl, setVideo] = useState(null);
  const [fileName, setFilename] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFilename(file.name);
    const url = URL.createObjectURL(file);
    setVideo(url);

    const formData = new FormData();
    formData.append('video', file);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/process-video', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const processedVideoBlob = await response.blob()
      const processedVideoUrl = URL.createObjectURL(processedVideoBlob)
      setVideo(processedVideoUrl)

    } catch (error) {
      console.error('Error:', error)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8"> Video Upload </h1>

        <div className="flex flex-col items-center">
          <label 
            htmlFor="video-upload" 
            className="w-full flex flex-col items-center px-4 py-6 bg-white text-gray-700 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg 
              className="w-12 h-12 text-gray-400 mb-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-sm text-gray-500 mb-2">
              {fileName || 'Click to upload or drag and drop'}
            </span>
            <span className="text-xs text-gray-400">
              MP4, MOV, or AVI (max. 10MB)
            </span>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
          </label>
        </div>

      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {videoUrl && (
        <div className='mt-8'>
          <h2 className="text-xl text-center"> Preview </h2>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <video 
              controls 
              className="w-full h-full object-cover"
              src={videoUrl}
              > Your browser does not support the video
              </video>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
