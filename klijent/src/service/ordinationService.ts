import axios from "axios";
import { Ordination } from "../types";


export async function getAllOrdinations() {
  const res = await axios.get('/ordination');
  return res.data as Ordination[];
}