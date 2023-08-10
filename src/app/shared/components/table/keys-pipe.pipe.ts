import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value: string[]) : any {
    return Object.keys(value);
  }
}
