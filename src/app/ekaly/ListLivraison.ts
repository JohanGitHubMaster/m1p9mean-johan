import { Time } from "@angular/common";

export class ListLivraison {
    _id!:number;
    id_plat!:number;
    id_restaurant!:number;
    id_client!:number;
    id_contact!:number;
    id_livraison!:number;
    date_de_commande!:Date;
    quantitetotalparplat!:4;
    etats!:string;
    prixtotalparplat!:number;
    nom!:string;
    email!:string;
    numero!:string;
    prix!:number;
    type!:string;
    description!:string;
    noteclient!:string;
    quantite!:number;
    image!:string;
    lieudelivraison!:string;
    datedelivraison!:Date;
    heuredelivraison!:Time;
    name!:string;
    lastname!:string;
}