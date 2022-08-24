import { Status } from 'src/app/shared/enums/Status.enum';

export class Task {
  Generator?: string;
  Title?: string;
  Description: string;
  Responsible: string;
  Activity?: string;
  Status: Status;
  GeneratorName: string;
  ResponsibleName: string;
}
