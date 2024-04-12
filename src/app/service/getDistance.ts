import api from "../config/api";

export async function getDistance(name: string) : Promise<number> {
  return api.get(`v1/city/distance?city=${name}`)
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    });
}