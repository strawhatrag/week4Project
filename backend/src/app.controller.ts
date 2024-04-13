import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokenDto } from './dtos/mintToken.dto';
import { DeployBallotDto } from './dtos/deployBallot.dto';
import { CastVoteDto } from './dtos/castVote.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('token-name')
  async getTokenName() {
    return { result: await this.appService.getTokenName() };
  }

  @Get('token-symbol')
  async getTokenSymbol() {
    return { result: await this.appService.getTokenSymbol() };
  }

  @Get('contract-address')
  getContractAddress() {
    return { result: this.appService.getContractAddress() };
  }

  @Get('total-supply')
  async getTotalSupply() {
    return { result: await this.appService.getTotalSupply() };
  }

  @Get('token-balance/:address')
  async getTokenBalance(@Param('address') address: string) {
    return { result: await this.appService.getTokenBalance(address) };
  }

  @Get('transaction-receipt')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return { result: await this.appService.getTransactionReceipt(hash) };
  }

  @Get('server-wallet-address')
  async getServerWalletAddress() {
    return { result: await this.appService.getServerWalletAddress() };
  }

  @Get('check-minter-role')
  async checkMinterRole(@Query('address') address: string) {
    return { result: await this.appService.checkMinterRole(address) };
  }

  @Post('mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    return {
      result: await this.appService.mintTokens(body.address, body.value),
    };
  }

  @Get('check-votes/:address')
  async checkVotingPower(@Param('address') address: string) {
    return { result: await this.appService.checkVotingPower(address) };
  }

  @Post('delegate-votes/:address')
  async delegateVotingPower(@Param('address') address: string) {
    return { result: await this.appService.delegateVotingPower(address) };
  }

  // --- Ballot Contract ---
  @Post('deploy-ballot')
  async deployBallotContract(@Body() deployBallotDto: DeployBallotDto) {
    const { proposalNames, tokenContractAddress, targetBlockNumber } =
      deployBallotDto;
    return await this.appService.deployBallotContract(
      proposalNames,
      tokenContractAddress,
      targetBlockNumber,
    );
  }

  @Get('ballot-proposals/:address')
  async getProposals(@Param('address') address: string) {
    return await this.appService.getProposals(address);
  }

  //TODO: castVote
  @Post('cast-vote/:address')
  async castVote(@Body() body: CastVoteDto) {
    const { ballotAddress, votingPowerAmount, proposalIndex } = body;
    return await this.appService.castVote(
      ballotAddress,
      votingPowerAmount,
      proposalIndex,
    );
  }

  @Get('winning-proposal/:address')
  async getWinningProposal(@Param('address') address: string) {
    return await this.appService.getWinningProposal(address);
  }
}
//TODO: getPastVotes ? -> to calculate for how much unused voting power the user still has for the 'selected' ballot?
