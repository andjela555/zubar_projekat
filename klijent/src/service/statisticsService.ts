import axios from "axios";

export interface Stats {
  serviceStatistics: any,
  timeStatistics: any,
}

export async function getStatistics() {
  const res = await axios.get('/statistics');
  return res.data as Stats;
}