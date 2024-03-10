import { User } from './user';

 export enum Status {
  Devis = 'Devis',
  Commande = 'Commande',
  Livraison = 'Livraison',
}

export class Devis {
  id?: string;
  dateDevis?: Date;
  status?: Status;  
  montant?: number;
  converted?: boolean;
  user?: string;
  showroom?: string;
  numDevis?: string;
  client?: string;
  commercial?: string;
}