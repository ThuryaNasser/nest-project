import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  /*
   @Type(() => Number) 
    to transfer the value that coming in to a number,
    but no need here because we fix it in the main.ts file 
  */
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
