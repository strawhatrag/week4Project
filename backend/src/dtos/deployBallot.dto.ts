import { ApiProperty } from '@nestjs/swagger';

export class DeployBallotDto {
  @ApiProperty({
    description: 'List of proposal names to be converted to bytes32[]',
    type: [String],
    required: true,
    example: ['Proposal 1', 'Proposal 2'],
  })
  proposalNames: string[];

  @ApiProperty({
    description: 'Address of the token contract',
    type: String,
    required: true,
    example: '0xB1c4bB25346ad3F3de0019AE75eEa1ADAce201e8',
  })
  tokenContractAddress: string;

  @ApiProperty({
    description: 'Target block number for the ballot to end',
    type: Number,
    required: true,
    example: 12345678,
  })
  targetBlockNumber: bigint;
}