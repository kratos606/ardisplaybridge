import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "./QRCode";
import { config } from "./config/model.config";
import axios from "axios";

function App() {
  const { id } = useParams();
  const [res, setRes] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    ) {
      return navigate(`/${id}/view`);
    }
  }, [id, navigate]);

  const loadData = async () => {
    const res = await axios.get(`${config.apiUrl}/api/3d-model?id=${id}`)
    console.log(res.data)
    setRes({
      image:{
        url: res.data.options[0].image
      },
      logo: {
        url: res.data.logo
      },
      title: res.data.title
    })
  }

  useEffect(() => {
    loadData()
  },[])

  return (
    <>
      <div className="flex flex-col justify-stretch items-center h-screen w-screen p-3 bg-slate-400 overflow-hidden">
        <a
          rel="noreferrer"
          href={res?.url ?? ""}
          title="The Creatiiives"
          target="_blank"
        >
          {res?.logo?.url && (
            <img
              className="h-10 w-auto max-w-[140px] object-contain"
              src={res?.logo?.url}
              alt="Client logo"
            />
          )}
        </a>
        <div className="max-w-5xl w-full h-[80%] md:m-auto flex flex-wrap justify-around items-center bg-white rounded-xl p-3 m-3">
          <div className="md:flex w-full sm:w-1/2 md:flex-col md:items-center md:justify-center m-auto md:h-fit h-full">
            <h1 className="text-[#482dfa] font-bold text-3xl md:text-4xl max-w-[300px] mb-3 text-center m-auto">
              Afficher sur votre mur
            </h1>
            <p className="max-w-[300px] text-gray-800 text-xs md:text-sm text-center mb-2 m-auto">
              Pour voir le portrait sur votre mur, scannez ce QR Code avec votre
              téléphone.
            </p>
            <div className="flex justify-center h-44">
              <QRCode url={`${window.location.href}/view`} />
            </div>
          </div>
          <div className="m-auto w-full sm:w-1/2 h-full flex justify-center items-center md:mt-0 mt-3">
            {res?.image?.url && (
              <img
                className="max-h-[75%] w-auto m-auto object-contain"
                src={res?.image?.url}
                alt={res?.title}
              />
            )}
          </div>
        </div>
        {/* footer */}
        <div className="">
          <span className="inline-block font-normal text-sm text-gray-600 mr-2">
            Powered by
          </span>
          <a
            rel="noreferrer"
            href="https://ardisplay.io/"
            title="AR Display"
            target="_blank"
          >
            <img
              className="inline-block h-8 w-auto"
              src="/logo.png"
              alt="Client logo"
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
