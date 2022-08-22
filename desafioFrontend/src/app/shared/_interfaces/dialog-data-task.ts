import { Status } from 'src/app/shared/enums/Status.enum';

export interface DialogDataTask {
  Generator: string;
  Title: string;
  Description: string;
  Responsible: string;
  Activity: string;
  Status: Status;
}
