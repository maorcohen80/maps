import { useState, useEffect } from "react";

import "./App.css";
import { ReactBingmaps } from "react-bingmaps";
import TextField from "@material-ui/core/TextField";

const App = () => {
  const [cords, setCords] = useState([42.360081, -71.058884]);
  const [readyMap, setReadyMap] = useState(false);
  const [pins, addPins] = useState([]);
  const [polyline, setPolyLines] = useState({
    location: [],
    option: { strokeColor: "red", strokeThickness: 2, strokeDashArray: [0, 0, 0, 0] },
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCords([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const addPinToMap = (a, b) => {
    let updatedPins = {
      location: [a, b],
      option: { color: "red" },
      addHandler: {
        type: "click",
        callback: () => {
          console.log("added");
        },
      },
    };
    addPins([...pins, updatedPins]);
  };

  const addPolyLine = (a, b) => {
    let newLine = { ...polyline };
    let line = [a, b];
    newLine.location.push(line);
    setPolyLines(newLine);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPinToMap(e.target[0].value, e.target[1].value);
    addPolyLine(e.target[0].value, e.target[1].value);
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
            onMapReady={setTimeout(() => {
              setReadyMap(true);
            }, 2000)}
            pushPins={pins}
            polyline={polyline}
          />
        </div>
        {readyMap && (
          <div style={{ marginLeft: "20px", display: "flex", flex: 0.4, flexDirection: "row" }}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField id="standard-basic1" label="enter latitude" />
              <TextField id="standard-basic2" label="enter longitude" />
              <br />
              <TextField type="submit" value="Submit" />
            </form>
          </div>
        )}
      </div>
      <div style={{ marginLeft: "280px" }}>
        {pins.length > 0 &&
          pins.map((pin) => {
            return (
              <div>
                lan: {pin.location[0]} longitude: {pin.location[1]}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
