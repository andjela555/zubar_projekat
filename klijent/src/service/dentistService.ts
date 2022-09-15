import axios from "axios";
import { Dentist } from "../types";


export async function getDentists() {
  const res = await axios.get('/dentist');
  return res.data as Dentist[];
}

export async function createDentist(data: any) {
  const res = await axios.post('/dentist', data);
  return res.data as Dentist;
}

export async function updateDentist(id: number, data: any) {
  const res = await axios.patch('/dentist/' + id, data);
  return res.data as Dentist;
}

export async function deleteDentist(id: number) {
  await axios.delete('/dentist/' + id);
}