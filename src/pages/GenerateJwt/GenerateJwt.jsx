const GenerateJwt = () => {
  const generateJWT = () => {
    console.log("clicked");

    fetch(`http://localhost:5000/generate-jwt`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName: "Batch-seven" }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <button className="border-gray-700 border-2 p-2" onClick={generateJWT}>
        Generate JWT
      </button>
    </div>
  );
};

export default GenerateJwt;
