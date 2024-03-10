export class Claim {
    id?: string;
    description?: string;
    title?: string;
    date?: string;
    status?: Status;

     }

enum Status {
        IN_PROGRESS,
        DONE
      }