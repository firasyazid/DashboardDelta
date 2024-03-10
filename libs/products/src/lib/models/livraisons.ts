
import { User } from "./user";
import { Commande } from "./commande";
import { Devis } from "./devis";
 

export class Livraison {
    id?: string;
    user: User;
    dateLivraison?: Date | null;
     numLivraison: string;
     commande: Commande;
     devis: Devis;
     montantLivraison: number;

   }
  