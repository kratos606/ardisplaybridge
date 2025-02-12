import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Model = () => {
  const errorViewer = useRef(null);
  const [res, setRes] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Redirect if not on mobile
  useEffect(() => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      return navigate(`/${id}`);
    }
  }, [navigate, id]);

  // Set a CSS variable for the viewport height
  useEffect(() => {
    const setVh = () => {
      // Calculate 1% of the viewport height
      const vh = window.innerHeight * 0.01;
      // Set the value in the --vh custom property on the root document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Initial setting of --vh
    setVh();

    // Update the value on resize
    window.addEventListener("resize", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  return (
    // Instead of h-[100vh], we use inline styling that computes the height using --vh.
    <div
      className="w-[100vw] mobile-view overflow-hidden"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div className="w-full h-full model-preview">
        <div className="h-full w-full flex bg-purple-950 flex-col justify-around items-center">
          <a
            rel="noreferrer"
            href={res?.url ?? ""}
            title="The Creatiiives"
            target="_blank"
          >
            <img
              className="top-0 left-1/3 h-10 w-auto object-contain m-2 max-w-[140px]"
              src="/client-logo.png"
              alt="provided by AR Display"
            />
          </a>
          <img
            className="w-[85%] h-auto max-w-xl m-auto object-contain rounded-lg"
            src={"/bridge-img.gif"}
            alt="model"
          />
          <div className="mb-6">
            <ardisplay-viewer src={id}></ardisplay-viewer>
          </div>
          <div className="bg-slate-400 w-full flex justify-center items-center">
            <span className="text-white text-sm font-light">Powered by</span>
            <a
              rel="noreferrer"
              href="https://ardisplay.io/"
              title="AR Display"
              target="_blank"
            >
              <img
                className="top-0 left-1/3 h-10 w-auto object-contain m-2"
                src="/logo.png"
                alt="provided by AR Display"
              />
            </a>
          </div>
        </div>

        <div className="h-full w-full">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-white text-black h-full w-full hidden"
            ref={errorViewer}
            id="error"
          >
            Can't display AR
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
