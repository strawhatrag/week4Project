import { useEffect, useRef, useState } from "react";

type Prop = {
  isViewingProposals: boolean;
  setIsViewingProposals: (viewing: boolean) => void;
  ballotAddress: string;
};

type Proposal = {
  proposalName: string;
  proposalVoteCount: number;
};

function ViewProposalsModal({ isViewingProposals, setIsViewingProposals, ballotAddress }: Prop) {
  const proposalModalRef = useRef<HTMLDialogElement | null>(null);
  const [proposalList, setProposalList] = useState([]);

  useEffect(() => {
    if (proposalModalRef.current) {
      isViewingProposals ? proposalModalRef.current.showModal() : proposalModalRef.current.close();
    }
  }, [isViewingProposals]);

  useEffect(() => {
    if (!ballotAddress) return;
    fetch(`http://localhost:3001/ballot-proposals/${ballotAddress}`)
      .then(res => res.json())
      .then(data => {
        setProposalList(data);
      });
  }, [ballotAddress]);

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal" ref={proposalModalRef} onClose={() => setIsViewingProposals(false)}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Here are the proposals:</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Index #</th>
                  <th>Proposal Name</th>
                  <th>Vote Count</th>
                </tr>
              </thead>
              <tbody>
                {proposalList.map((proposal: Proposal, index: number) => (
                  // Apply alternating background color for each row
                  <tr className={index % 2 === 0 ? "bg-base-200" : ""} key={proposal.proposalName}>
                    <th>{index}</th>
                    <td>{proposal.proposalName}</td>
                    <td>{proposal.proposalVoteCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <ol>
            {proposalList?.map((proposal: Proposal) => (
              <li key={proposal.proposalName}>
                {proposal.proposalName} - Votes: {proposal.proposalVoteCount}
              </li>
            ))}
          </ol> */}
        </div>
      </dialog>
    </>
  );
}
export default ViewProposalsModal;
