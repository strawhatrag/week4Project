import { ApiProperty } from '@nestjs/swagger';

export class MintTokenDto {
  @ApiProperty({
    type: String,
    required: true,
    default: '0xB1c4bB25346ad3F3de0019AE75eEa1ADAce201e8',
  })
  address: string;
  @ApiProperty({ type: String, required: true, default: '10' })
  value: string;
}