


// import React, { useEffect, useRef } from 'react';
// import Hls from 'hls.js';
// import Navbar from '../components/Navbar';

// const LivePlayer = () => {
//   const videoRef = useRef(null);
//   const streamUrl = 'https://ktvhdsg.ekantipur.com:8443/high_quality_85840165/hd/playlist.m3u8';

//   useEffect(() => {
//     if (videoRef.current) {
//       if (Hls.isSupported()) {
//         const hls = new Hls();
//         hls.loadSource(streamUrl);
//         hls.attachMedia(videoRef.current);
//         hls.on(Hls.Events.ERROR, function (event, data) {
//           console.error('HLS error:', data);
//         });
//       } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
//         // Safari fallback
//         videoRef.current.src = streamUrl;
//       }
//     }
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center mt-6">
//         <h1 className="text-2xl font-semibold mb-4 text-gray-800">📺 Live Broadcast</h1>
//         <video
//           ref={videoRef}
//           controls
//           autoPlay
//           className="w-full max-w-5xl rounded-xl shadow-lg"
//         />
//       </div>
//     </>
//   );
// };

// export default LivePlayer;

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LivePlayer = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const streamUrl = 'https://ktvhdsg.ekantipur.com:8443/high_quality_85840165/hd/playlist.m3u8';

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.ERROR, function (event, data) {
          console.error('HLS error:', data);
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = streamUrl;
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              📺 Live Broadcast
              <span className="text-red-600 text-sm bg-red-100 border border-red-400 px-2 py-1 rounded-full animate-pulse">
                🔴 Live Now
              </span>
            </h2>
            <button
              onClick={() => navigate('/home-page')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow"
            >
              ← Back to Home
            </button>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-300 shadow-inner">
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full h-[500px] bg-black rounded-xl"
            />
          </div>

          <p className="text-center text-gray-500 text-sm">
            Streaming from Kantipur HD – powered by Ekantipur Network
          </p>
        </div>
      </div>
    </>
  );
};

export default LivePlayer;


