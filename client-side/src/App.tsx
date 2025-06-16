import { useEffect, useState } from "react";


function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8000")
      .then((res) => res.json())
      .then((data) => {console.log(data);
                       setMessage(data.Hello);})
      .catch((err) => setMessage("Failed to fetch: " + err.message));
  }, []);
  

  return (
    <div style={{ padding: "2rem", fontSize: "1.5rem" }}>
      <p>{message}</p>
    </div>
  );
}

export default App
