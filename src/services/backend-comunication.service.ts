import { IStep1CreateUser, IStep1PersonalData, IStep2Address } from "@/utils/form.util";
import axios from "axios"
import { UUID } from "node:crypto";

const API_URL = process.env.NEXT_API_BASE_URL;


export async function checkEmailIsUnavailable(email: string): Promise<boolean> {
  const url = new URL(API_URL + '/Cadastro/EmailExiste/' + encodeURIComponent(email))
  return (await axios.get(url.toString()))?.data
}

export async function checkCpfIsUnavailable(cpf: string): Promise<boolean> {
  const url = new URL(API_URL + '/Cadastro/CpfExiste/' + encodeURIComponent(cpf))
  return (await axios.get(url.toString()))?.data
}

export async function createUser(data: IStep1CreateUser): Promise<UUID> {
  const body = {
    nome: data.fullName,
    cpf: data.documentNumber,
    celular: data.cellphoneNumber,
    dataNascimento: data.birthdate,
    aceitaDivulgarTelefones: data.authorizeExposeCellNumbers,
    desejaReceberInformacoes: data.acceptReceiveInfo,
    aceitaTermosUso: data.acceptTerms
  };
  
  const url = new URL(API_URL + '/Cadastro/CriarUsuario')
  return (await axios.post(url.toString(), body))?.data
}

export async function putPersonalData(id: UUID, data: IStep1PersonalData): Promise<UUID> {
  const body = {
    id,
    email: data.email,
    genero: data.gender,
    indicacao: data.isIndication,
    codigoIndicacao: data.resellerCode || ''
  };
  
  const url = new URL(API_URL + '/Cadastro/AdicionarDadosPessoais/')
  return (await axios.post(url.toString(), body))?.data
}

export async function putAddressData(id: UUID, data: IStep2Address): Promise<UUID> {
  const body = {
    id,
    cep: data.cep,
    logradouro: data.address,
    numero: data.addressNumber,
    complemento: data.addressAdditionalInfo || '',
    bairro: data.neighborhood || '',
    cidade: data.city || '',
    estado: data.state || '',
    referencia: data.addressReference || ''
  };
  
  const url = new URL(API_URL + '/Cadastro/AdicionarEndereco/')
  return (await axios.post(url.toString(), body))?.data
}