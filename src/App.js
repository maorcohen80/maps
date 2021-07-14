import { useState, useEffect } from "react";

import "./App.css";
import { ReactBingmaps } from "react-bingmaps";
import TextField from "@material-ui/core/TextField";

const pushPins = [
  {
    location: [42.360081, -71.058884],
    option: { color: "red" },
    addHandler: { type: "click", callback: () => {} },
  },
];

function App() {
  const [cords, setCords] = useState([42.360081, -71.058884]);
  const [readyMap, setReadyMap] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCords([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const handleValChange = (e) => {
    console.log(`e.target.value`, e.target.value);
  };
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex", flex: 0.4 }}>
          <ReactBingmaps
            bingmapKey="AjMjGzQrdjeJT8mzYG-7NECnEOQF0NjhcAXyT4Oy5CxAHBrvZwm8-G_Tk9hdG2wG"
            center={[cords[0], cords[1]]}
            onMapReady={!readyMap ? setReadyMap(true) : null}
            pushPins={pushPins}
          />
          {readyMap && (
            <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column" }}>
              <form noValidate autoComplete="off">
                <TextField id="standard-basic1" label="enter latitude" onChange={handleValChange} />
                <TextField id="standard-basic2" label="enter longitude" />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
