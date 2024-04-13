import { useState } from "react";

function TokenInteractions() {
  const [addressVal, setAddressVal] = useState("");
  const [amountVal, setAmountVal] = useState("");

  const handleAddressValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressVal(e.target.value);
  };
  const handleAmountValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountVal(e.target.value);
  };

  const handleMintSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    try {
      const response = await fetch("http://localhost:3001/mint-tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: addressVal, value: amountVal }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Mint successful:", data);
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  const handleDelegateSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    try {
      const response = await fetch(`http://localhost:3001/delegate-votes/${addressVal}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Delegation successful:", data);
    } catch (error) {
      console.error("Error delegating votes:", error);
    }
  };

  return (
    <>
      <div className="card w-96 bg-secondary text-primary-content ">
        <div className="card-body">
          <h2 className="card-title">
            {" "}
            <div className="flex justify-center items-center space-x-2">
              <p className="my-2 font-medium">Token Interactions!</p>
            </div>
          </h2>
          <form action="">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Wallet Address</span>
              </div>
              <input
                type="text"
                value={addressVal}
                onChange={handleAddressValChange}
                placeholder="0xB36Ca00...14aFDd"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Amount</span>
              </div>
              <input
                type="text"
                value={amountVal}
                onChange={handleAmountValChange}
                placeholder="1000n"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <button onClick={handleMintSubmit} className="btn btn-outline btn-accent m-3 mt-5">
              Mint
            </button>
            <button onClick={handleDelegateSubmit} className="btn btn-outline btn-accent m-3">
              Delegate
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default TokenInteractions;
