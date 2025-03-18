import axios from "axios"

const API_URL = process.env.NEXT_API_BASE_URL;


export async function checkEmailIsUnavailable(email: string): Promise<boolean> {
  const url = new URL(API_URL + '/Cadastro/EmailExiste/' + encodeURIComponent(email))
  return (await axios.get(url.toString()))?.data
}

export async function checkCpfIsUnavailable(cpf: string): Promise<boolean> {
  const url = new URL(API_URL + '/Cadastro/CpfExiste/' + encodeURIComponent(cpf))
  return (await axios.get(url.toString()))?.data
}