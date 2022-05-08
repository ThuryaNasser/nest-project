import { PartialType } from '@nestjs/mapped-types';
import { CreateTeaDto } from './create-tea.dto';

// PartialType makes sure that all value are optional
// and all of them have the exact validation as the class we are passing to it
export class UpdateTeaDto extends PartialType(CreateTeaDto) {}
