import axios from "axios";
import { Intervention, InterventionResult } from "../types";


export async function createIntervention(data: any) {
  const res = await axios.post('/patient/interventions', {
    ...data,
    start: new Date(data.start).getTime()
  });
  return res.data as Intervention;
}

export async function getPatientInterventions() {

  const res = await axios.get('/patient/interventions');
  return res.data as Intervention[];

}

interface Params {
  dentistId: number,
  from: number,
  to: number,
  size: number,
  page: number
}

export async function getTechnitianInterventions(params?: Partial<Params>) {
  const res = await axios.get('/technitian/interventions', {
    params
  });
  return res.data as InterventionResult

}