import { Time } from "@angular/common";

export class livraisonuser {
    prix!:number;
    id_livraison !: number;
    id_client!:number;
    name !: string;
    lastname !: string;
    lieudelivraison!:string;
    datedelivraison!:Date;
    heuredelivraison!:Time;
}