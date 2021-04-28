import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users:User[], str: string): any {
    return users.filter((item)=>{return item.name.indexOf(str)!=-1})
  }
}
