"use client";

import { useState } from "react";
import Link from "next/link";
import BallotDetails from "./_components/BallotDetails";
import TokenInteractions from "./_components/TokenInteractions";
import UserStats from "./_components/UserStats";
import ViewProposalsModal from "./_components/ViewProposalsModal";
import VoteModal from "./_components/VoteModal";
import type { NextPage } from "next";
import { useStep } from "usehooks-ts";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [ballotAddress, setBallotAddress] = useState("");
  const [isViewingProposals, setIsViewingProposals] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  return (
    <>
      {isViewingProposals && (
        <ViewProposalsModal
          ballotAddress={ballotAddress}
          isViewingProposals={isViewingProposals}
          setIsViewingProposals={setIsViewingProposals}
        />
      )}
      {isVoting && <VoteModal isVoting={isVoting} setIsVoting={setIsVoting} ballotAddress={ballotAddress} />}

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Voting dApp</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>

        <div className="flex flex-row justify-center gap-8 bg-base-300 w-full mt-8 px-8 py-12">
          <UserStats address={connectedAddress || ""} />
          <BallotDetails
            ballotAddress={ballotAddress || ""}
            setBallotAddress={setBallotAddress}
            setIsViewingProposals={setIsViewingProposals}
            setIsVoting={setIsVoting}
          />
          <TokenInteractions />
        </div>
      </div>
    </>
  );
};

export default Home;
