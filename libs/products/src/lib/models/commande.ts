import { User } from "./user";
import { Devis } from "./devis";
import { Showroom } from "./showroom";
 

export class Commande {
    id?: string;
    user: User;
     dateCmd: Date;
     devis: Devis;
     montantCmd: number;
     numCmd: string;
      showroom: Showroom;
    }
  