import { useState } from "react";
import { Address as AddressType } from "viem";
import { Address } from "~~/components/scaffold-eth/";

type Props = {
  setIsViewingProposals: (viewing: boolean) => void;
  setIsVoting: (voting: boolean) => void;
  ballotAddress: string;
  setBallotAddress: (address: string) => void;
};

function BallotDetails({ ballotAddress, setBallotAddress, setIsViewingProposals, setIsVoting }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements[0] as HTMLInputElement;
    setBallotAddress(input.value);
  };

  return (
    <>
      <div className="card w-96 bg-secondary text-primary-content ">
        <div className="card-body justify-center items-center">
          <h2 className="card-title">
            {" "}
            <div className="flex justify-center items-center space-x-2">
              <p className="my-2 font-medium">Ballot Address</p>
            </div>
          </h2>
          {!ballotAddress ? (
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
              <button className="btn btn-outline btn-accent mt-4">Submit</button>
            </form>
          ) : (
            <>
              {" "}
              <Address address={ballotAddress} format="short" size="sm" />
              <div className="card-actions flex-col justify-evenly items-center m-6 p-6">
                <button className="btn m-2" onClick={() => setIsViewingProposals(true)}>
                  See Proposals
                </button>
                <button className="btn m-2" onClick={() => setIsVoting(true)}>
                  Vote Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default BallotDetails;
