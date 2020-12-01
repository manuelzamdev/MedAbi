export interface Users {
    email: string;
    name: string;
    lastname: string;
    type: utype;
    uid: string;
    personalid: string;
    phone: string;
}

export enum utype {
    Patient,
    Doctor
}

export interface IDoctor extends Users {
    verified: boolean;
    category: number; /* Medicina genral: 0 ; Solud mental: 1 ; Nutricion: 2 Salud sexual: 3 Odontologo: 4  */
}
