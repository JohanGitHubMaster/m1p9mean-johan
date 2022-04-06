import { Time } from "@angular/common";

export class livraisonresto {
    prix!:number;
    id_livraison !: number;
    lastname !: string;
    lieudelivraison!:string;
    datedelivraison!:Date;
    heuredelivraison!:Time;
    nom!:string;
    prixtotalparplat!:number;
    date_de_commande!:Date;
    id_restaurant!:number;
}