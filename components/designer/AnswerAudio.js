import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { useDispatch } from "react-redux";

const AnswerAudio = ({ audioUrl, word, loading }) => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const handlePlay = () => {
    audioRef.current.play();
  };

  const LoadingSpinner = () => {
    return (
      <div className={`h-10 flex items-center justify-start gap-2 `}>
        <svg className="h-8 w-8 animate-spin" viewBox="3 3 18 18">
          <path
            className="fill-gray-200"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          ></path>
          <path
            className="fill-gray-300"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
          ></path>
        </svg>
        <div className={"text-gray-500 text-xs"}>Loading Audio</div>
      </div>
    );
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="text-xl text-gray-300 flex items-center">
      <audio
        ref={audioRef}
        src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + audioUrl}
      />
      <button
        className="text-gray-400 hover:text-gray-500"
        onClick={handlePlay}
      >
        <SpeakerWaveIcon className={"h-8 w-8 mr-2"} />
      </button>
      {word}
    </div>
  );
};
export default AnswerAudio;
