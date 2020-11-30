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
}
