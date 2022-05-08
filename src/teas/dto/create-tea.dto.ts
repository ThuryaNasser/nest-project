import { IsString } from 'class-validator';

export class CreateTeaDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  //for array of strings we use each
  @IsString({ each: true })
  readonly flavors: string[];
}
/* 
- Data Transfer Objects
    what is it ? 
    it is an object used to encapsulate data, and set it from one application to another
    why we use it ?
    to help us define interfaces for input and output within our system 
    (what we expect to receive in the body - payload )

- we add (readonly) to help maintain immutability 
*/
