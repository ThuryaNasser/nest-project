import { SetMetadata } from '@nestjs/common';
/*
 SetMetadata takes 2 parameters: 
 1- key : lookup key 
 2- metadata value 


 inside a decorator folder we define 2 things:
 1- our metadata const KEY
 2- the decorator itself 
*/
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
