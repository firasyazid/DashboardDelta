export class Session {
    id?: string;
    nameUser?: string;
    dateSession?: Date;
    postes?: Post[];
    fondInitial?: string;
    fondFinal?: string | null;
    SommeCopmteur?: number | null;
    Nbheure?: number | null;
    Somme?: number | null;

}

export class Post {
    name?: string;
    compteur?: number | null;
    CompteurR?: number | null;

}  