import { useEffect, useState } from "react";
import { Address as AddressType } from "viem";

type Props = {
  address: AddressType;
};
function UserStats({ address }: Props) {
  //TODO: make the data dynamic
  //   const [pageInfo, setPageInfo] = useState({ tokenName: "filler", tokenSymbol: "" });
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [votingPower, setVotingPower] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/token-name")
      .then(res => res.json())
      .then(data => {
        setTokenName(data.result);
      });

    fetch("http://localhost:3001/token-symbol")
      .then(res => res.json())
      .then(data => {
        setTokenSymbol(data.result);
      });

    fetch(`http://localhost:3001/token-balance/${address}`)
      .then(res => res.json())
      .then(data => {
        setTokenBalance(data.result);
      });

    fetch(`http://localhost:3001/check-votes/${address}`)
      .then(res => res.json())
      .then(data => {
        setVotingPower(data.result);
      });
  }, [address]);

  return (
    <>
      <div className="stats stats-vertical shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Token Balance</div>
          <div className="stat-value">{tokenBalance} </div>
          <div className="stat-desc">
            {tokenName} - {tokenSymbol}
          </div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Voting Power</div>
          <div className="stat-value text-secondary">{votingPower}</div>
          {/* <div className="stat-desc text-secondary">88/100</div> */}
        </div>

        {/* <div className="stat place-items-center">
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div> */}
      </div>
    </>
  );
}
export default UserStats;
