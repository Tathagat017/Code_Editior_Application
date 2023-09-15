import React, { useState } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import "brace/mode/javascript";
import "brace/theme/monokai";

const Main = () => {
  const [code, setCode] = useState("");
  const [transpiledCode, setTranspiledCode] = useState("");
  const [error, setError] = useState(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleTranspile = async () => {
    try {
      const response = await axios.post("http://localhost:3001/exe", {
        code,
      });
      console.log(response);
      setTranspiledCode(response.data.code);
      setError(null); // Reset error if the request is successful
    } catch (error) {
      console.error("Error:", error.message);
      setError("Something went wrong. Please try again."); // Set the error message
    }
  };

  return (
    <div style={{ display: "flex", width: "60%" }}>
      <AceEditor
        mode="javascript"
        theme="monokai"
        value={code}
        onChange={handleCodeChange}
        style={{ width: "800px", height: "28rem" }}
      />
      <div
        style={{
          display: "block",
          textAlign: "center",
          borderLeft: "2px solid white",
          background: "#272822",
          color: "white",
          width: "65%",
        }}
      >
        {" "}
        <button onClick={handleTranspile}>Transpile Code</button>
        {error && <div>Error: {error}</div>}
        <div>
          <div style={{ border: "1px solid white", height: "150px" }}>
            <h3>Terminal Output:</h3>
            <pre>{transpiledCode}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
