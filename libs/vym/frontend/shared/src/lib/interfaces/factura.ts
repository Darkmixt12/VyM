export interface Factura {
  _id: string;
  numPedido: number;
  facturasId: number;
  client?: string;
  fechaReg?: string;
  pushMoney?: string;
  nomAlistador?: string | null;
  nomChequeador?: string | null;
  fechaAlistado?: string;
  fechaChequeo?: string;
  numMesa?: string;
  horaChequeo?: string;
}
