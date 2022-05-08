import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTeaDto } from './dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto';
import { TeasService } from './teas.service';

@Controller('teas')
export class TeasController {
  //to inject the provider we can simply use constructors
  //private: accusable in this class only
  //readonly: to ready only from the service not modifying it
  constructor(private readonly teasService: TeasService) {}

  /*
  function syntax 
  @(called decorator)(any http request)()
  funcName() "function names docent matters" {        
    funcBody
  }
  */

  /*
  #########
  ## GET ##
  #########
  */

  //http://localhost:3000/teas
  //or
  //http://localhost:3000/teas?limit=10&offset=100
  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.teasService.findAll();
  }

  //http://localhost:3000/teas/flavors
  @Get('flavors')
  flavors() {
    return 'This action returns all flavors';
  }

  //http://localhost:3000/teas/255(any number here)
  // ' : ' is refers to dynamic praters
  //here we extracting dynamic parameter called id
  @Get(':id')
  findOne(@Param('id') id: string) {
    /*the @Param parameter let us grab all incoming request praters
    and used them inside the func body of our method
    when we dont pass any thing inside the @Param() that let us access all the request parameters
    we can access specific parameter by passing sting into @Param('id')*/
    return this.teasService.findOne(id);
  }

  /*
  ##########
  ## POST ##
  ##########
  */

  //http://localhost:3000/teas
  @Post()
  create(@Body() createTeaDto: CreateTeaDto) {
    return this.teasService.create(createTeaDto);
  }

  //to access specific value from the body
  // @Post()
  // create(@Body('name') name: string) {
  //   return name;
  // }

  /*
  ####################
  ## PUT , Patch ##
  ####################
  */
  /* for update there is 2 different methods:
  1-PUT:replaces the entire resource , so we need to have the entire object with the request payload
  2-Patch:modify the resource brashly, allowing us to update single prop of the resource 
  */

  //http://localhost:3000/teas/255(any number here)
  @Patch(':id')
  // update(@Param('id') id: string "too indicated what entity to update",
  //@Body() body "the updating it self === the new values " )
  update(@Param('id') id: string, @Body() updateTeaDto: UpdateTeaDto) {
    return this.teasService.update(id, updateTeaDto);
  }

  /*
  ############
  ## Delete ##
  ############
  */

  //http://localhost:3000/teas/255(any number here)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teasService.remove(id);
  }
}
