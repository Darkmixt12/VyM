export class Ncredito {
    constructor(
        public _id: string,
        public creditoId: number,
        public agente: string,
        public client: number,
        public status: string,
        public description : string,
        public creditoRegDia_db : string,
        public location : string
    ){}
}