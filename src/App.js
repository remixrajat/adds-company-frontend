import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/search/search?searchTerm=${state}`
      );
      setData(result.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      {error && <p>{error}</p>}
      <div style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Search here"
          onChange={(event) => {
            setState(event.target.value);
          }}
        />
        <button
          style={{ cursor: "pointer", color: "white", backgroundColor: "blue" }}
          onClick={fetchData}
        >
          Search
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        {data.map((d) => (
          <div
            style={{
              display: "flex",
              height: "500px",
              width: "200px",
              flexDirection: "column",
              backgroundColor: "#CDF9C8",
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100px",
                width: "100%",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <img src={d.imageUrl} alt="" />
            </div>
            <h3>{d.headline}</h3>
            <h3 style={{ color: "red" }}>{d.companies[0].name}</h3>
            <a style={{ textDecoration: "none" }} href={d.companies[0].url}>
              {d.CTA}
            </a>
            <p>{d.primaryText}</p>
            <p>{d.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
