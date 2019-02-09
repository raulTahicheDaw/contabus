export interface DiaModel {
  fecha: string,
  horaComienzo: string,
  horaFin: string,
  transfersA?: number,
  transfersB?: number,
  transfersC?: number,
  traslados?: number,
  excursiones?: number,
  partido: number,
  otrosServicios?: number,
  totalHoras: number,
  libre:boolean,
  observaciones: string
  user_id: string
}
