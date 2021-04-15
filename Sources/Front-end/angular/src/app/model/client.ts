import { noop } from "rxjs"

export class Client {
    UUIDClient : string
    position : number
    eMail : string
    Civilite : number
    Nom : string
    Prenom : string
    TelPortable : string

    //constructor 
   constructor(UUIDClient:string = "", eMail:string = "", Civilite = 0,Nom = "", Prenom = "", TelPortable = "") { 
    this.UUIDClient = UUIDClient;
    this.eMail = eMail;
    this.Civilite = Civilite;
    this.Nom = Nom;
    this.Prenom = Prenom;
    this.TelPortable = TelPortable;
 }
}
