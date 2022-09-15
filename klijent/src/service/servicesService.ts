import axios from "axios";
import { Service } from "../types";


export async function getAllServices() {
  const res = await axios.get('/service');
  return res.data as Service[];
}