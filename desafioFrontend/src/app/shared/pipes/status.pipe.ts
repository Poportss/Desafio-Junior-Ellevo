import { Pipe, PipeTransform } from '@angular/core';
import { Status } from 'src/app/shared/enums/Status.enum';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: Status, args?: any): any {
    switch (value) {
      case Status.InProgress:
        return 'In Progress';
      case Status.Completed:
        return 'Completed';
      case Status.NotStarted:
        return 'Not Started';
      case Status.Waiting:
        return 'Waiting';
    }
  }
}
