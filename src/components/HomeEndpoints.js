import React, { useState } from "react";
import { useSpinnerStore } from "../store/index.js";
import SpinnerModal from "./SpinnerModal.js";
import { hello } from "../api/helloWorld.js";
import { fetchData } from "../api/fetchData.js";
import { dbScan } from "../api/dbScan.js";
import SpinnerImg from "../assets/blue_14025120.png";
import "./HomeEndpoints.css";

const HomeEndpoints = () => {
  const [enableButton, setEnableButton] = useState(true);
  const [displaySpinnerModal, setDisplaySpinnerModal] = useState(false);
  const [zone1, setZone1] = useState("");
  const [zone2, setZone2] = useState("");
  const [zone3, setZone3] = useState("");
/*
  const setShowSpinner = useSpinnerStore((state) => state.setShowSpinner);
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
*/  const setLocalSpinner = useSpinnerStore((state) => state.setLocalSpinner);
  const localSpinner = useSpinnerStore((state) => state.localSpinner);

  const displaySpinner = () => {
    setEnableButton(false);
    //setShowSpinner(true);
    setDisplaySpinnerModal(true);
    setTimeout(() => {
      setDisplaySpinnerModal(false);
      //setShowSpinner(false);
      setEnableButton(true);
    }, 5000);
  };

  const loadZone = async (index) => {
    setLocalSpinner("zone" + index, true);
    let data;
    switch (index) {
        case 1:
            data = await hello();
            break;
        case 2:
            data = await fetchData(process.env.REACT_APP_SERVER + "/fetchData");
            break;
        case 3:
            data = await dbScan('SELECT NOW()', 'dataora');
            break;
        default:
    }
    const json = JSON.stringify(data);
    setTimeout(() => {
      switch (index) {
        case 1:
          setZone1(json);
          break;
        case 2:
          setZone2(json);
          break;
        case 3:
          setZone3(json);
          break;
        default:
      }
      setLocalSpinner("zone" + index, false);
    }, 5000);
  };

  return (
    <div>
      <div className="buttons spacer20">
        <button disabled={!enableButton} onClick={displaySpinner}>
          Show Spinner
        </button>
      </div>
      {/*showSpinner && (
        <img src={SpinnerImg} className="App-logo" alt="spinner" />
      )*/}
      <div className="zones">
        <div className="zone">
          <textarea disabled value={zone1}></textarea>
          <div className="buttons">
            <button onClick={() => loadZone(1)}>Hello World</button>
            {localSpinner.zone1 && (
              <img src={SpinnerImg} className="App-logo" alt="spinner" />
            )}
          </div>
        </div>
        <div className="zone">
          <textarea disabled value={zone2}></textarea>
          <div className="buttons">
            <button onClick={() => loadZone(2)}>Fetch Data</button>
            {localSpinner.zone2 && (
              <img src={SpinnerImg} className="App-logo" alt="spinner" />
            )}
          </div>
        </div>
        <div className="zone">
          <textarea disabled value={zone3}></textarea>
          <div className="buttons">
            <button onClick={() => loadZone(3)}>Database Scan</button>
            {localSpinner.zone3 && (
              <img src={SpinnerImg} className="App-logo" alt="spinner" />
            )}
          </div>
        </div>
      </div>
      <SpinnerModal isOpen={displaySpinnerModal} />
    </div>
  );
};

HomeEndpoints.displayName = "HomeEndpoints";

export default HomeEndpoints;
