import { ApiProperty } from "@nestjs/swagger";

export class authResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
