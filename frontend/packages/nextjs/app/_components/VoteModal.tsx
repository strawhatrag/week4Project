import { useEffect, useRef, useState } from "react";
import { abi } from "./TokenizedBallot.json";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";

type Prop = {
  isVoting: boolean;
  setIsVoting: (viewing: boolean) => void;
  ballotAddress: string;
};

function VoteModal({ isVoting, setIsVoting, ballotAddress }: Prop) {
  const voteModalRef = useRef<HTMLDialogElement | null>(null);
  const { write, data, isSuccess, isError, isLoading } = useContractWrite({
    address: ballotAddress,
    abi: abi,
    functionName: "vote",
  });

  useEffect(() => {
    if (voteModalRef.current) {
      isVoting ? voteModalRef.current.showModal() : voteModalRef.current.close();
    }
  }, [isVoting]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const proposalIndexInput = e.currentTarget.elements[0] as HTMLInputElement;
    const voteAmountInput = e.currentTarget.elements[1] as HTMLInputElement;

    const proposalIndex = BigInt(proposalIndexInput.value);
    const votingPowerAmount = parseEther(voteAmountInput.value);

    write({ args: [proposalIndex, votingPowerAmount] });
  };

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal" ref={voteModalRef} onClose={() => setIsVoting(false)}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">It's time to vote!</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Proposal Index"
              className="input input-bordered input-info w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Amount of votes"
              className="input input-bordered input-info w-full max-w-xs"
            />
            <button className="btn btn-outline btn-accent mt-4" disabled={isLoading}>
              {" "}
              Cast Vote
            </button>
            {isSuccess && data?.hash && <p>{data.hash}</p>}
          </form>
        </div>
      </dialog>
    </>
  );
}
export default VoteModal;
