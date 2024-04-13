import { ApiProperty } from '@nestjs/swagger';

export class CastVoteDto {
  @ApiProperty({
    description: 'Address of the ballot contract you wish to cast your vote in',
    type: String,
    required: true,
    example: '0xB36Ca0023231271e7584B1c57f49C2DF4f14aFDd',
  })
  ballotAddress: string;

  @ApiProperty({
    description: 'Amount of voting power you wish to use',
    type: BigInt,
    required: true,
    example: 100000n,
  })
  votingPowerAmount: bigint;

  @ApiProperty({
    description: 'The index of the proposal you chose',
    type: Number,
    required: true,
    example: 1n,
  })
  proposalIndex: number;
}