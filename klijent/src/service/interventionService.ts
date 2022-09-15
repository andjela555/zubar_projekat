import axios from "axios";
import { Intervention } from "../types";


export async function createIntervention(data: any) {
  const res = await axios.post('/interventions', data);
  return res.data as Intervention;
}