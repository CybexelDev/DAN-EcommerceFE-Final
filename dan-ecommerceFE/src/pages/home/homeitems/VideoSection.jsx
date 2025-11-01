import React, { useRef, useState} from 'react'
import pause from "../../../assets/images/videosection/Pause.png"
import play from "../../../assets/images/videosection/play.png"
import topicon from "../../../assets/images/components/toprightarrowcircle.png"
import vid from "../../../assets/videos/video5.mp4"

function VideoSection() {
  const videoRef = useRef(null)
  const [isplaying, setIsPlaying] = useState(true)

  const togglePlay = () => {
    if(!videoRef.current) return;

    if(isplaying){
    videoRef.current.pause();
    }else{
    videoRef.current.play();
    }

    setIsPlaying(!isplaying);
  };
  return (
    <div className='w-full aspect-[1440/515] bg-amber-300 relative rounded-[1.5vw] mb-[2vw]'>
        <video 
          ref={videoRef}
          className='w-full aspect-[1440/515] object-cover object-center overflow-hidden rounded-[1.5vw] '
          src={vid}
          autoPlay
          muted
          loop
          ></video>
        <div className="absolute  bg-white w-[4.85%] aspect-square top-0 right-0 rounded-bl-[1.5vw]  flex justify-center items-center 
                                before:content-['']  before:absolute before:w-[1.5vw] before:h-[1.5vw] before:z-10 before:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)] 
                                before:-top-[0vw] before:-left-[1.5vw] before:mask-shape
                                after:content-[''] after:absolute after:w-[1.5vw] after:h-[1.5vw] after:z-10 after:bg-[radial-gradient(circle_at_bottom_left,transparent_0%,_transparent_75%,_white_76%,_white_100%)]
                                 after:-bottom-[1.5vw] after:right-[0vw]">
                          <button 
                            className="w-[71.5%] aspect-square  flex justify-center bg-[#d8d8d8] rounded-full items-center"
                            onClick={togglePlay}>
                            <img className="w-[50%] h-[50%] "
                          src={isplaying ? pause : play} alt=" pause play btn" />
                          </button>
                        </div>
    </div>
  )
}

export default VideoSection