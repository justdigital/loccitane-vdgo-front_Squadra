import { IStepCreateUser, IStepContactData, IStepAddress, DocumentType, UploadFile } from "@/utils/form.util";
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

export async function checkCepIsValid(cep: string): Promise<boolean> {
  const url = new URL(API_URL + '/Cadastro/CepExiste/' + encodeURIComponent(cep))
  return (await axios.get(url.toString()))?.data
}

export async function checkCpfIsValid(cpf: string): Promise<string> {
  const urlParams = new URLSearchParams({cpf})
  const url = new URL(API_URL + '/Cadastro/ValidarCpf/?' + urlParams)
  return (await axios.get(url.toString()))?.data
}

export async function checkBirthdateMatches(cpf: string, dataNascimento: string): Promise<boolean> {
  const url = new URL(API_URL + '/Cadastro/validarDataNascimento')
  return (await axios.post(url.toString(), {cpf, dataNascimento}))?.data
}

export async function checkIndicationCodeIsValid(code: number | string): Promise<boolean> {
  const url = new URL(API_URL + '/Cadastro/ExisteIndicado/' + encodeURIComponent(code))
  return (await axios.get(url.toString()))?.data
}

export async function getStateList(): Promise<{id: number, nome: string, sigla: string}[]> {
  const url = new URL(API_URL + '/Estado/ListaEstados')
  return (await axios.get(url.toString()))?.data
}

export async function getStateCityList(stateId: number, cityFilter: string): Promise<{id: number, nome: string}[]> {
  const urlParams = new URLSearchParams({estadoId: stateId.toString(), nomeParcial: cityFilter})
  const url = new URL(API_URL + '/Municipio/ListaMunicipios?'+urlParams)
  return (await axios.get(url.toString()))?.data
}


export async function createUser(data: IStepCreateUser): Promise<UUID> {
  const body = {
    nome: data.fullName,
    cpf: data.documentNumber,
    celular: data.cellphoneNumber,
    aceitaDivulgarTelefones: data.authorizeExposeCellNumbers,
    desejaReceberInformacoes: data.acceptReceiveInfo,
    aceitarTermosUso: data.acceptTerms
  };
  
  const url = new URL(API_URL + '/Cadastro/CriarUsuario')
  return (await axios.post(url.toString(), body))?.data
}

export async function putPersonalData(id: UUID, data: IStepContactData): Promise<any> {
  const body = {
    id,
    dataNascimento: data.birthdate,
    email: data.email,
    genero: data.gender,
    indicacao: data.isIndication,
    codigoIndicacao: data.resellerCode || ''
  };
  
  const url = new URL(API_URL + '/Cadastro/AdicionarDadosContato/')
  return (await axios.post(url.toString(), body))?.data
}

export async function putAddressData(id: UUID, data: IStepAddress): Promise<any> {
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

export async function finishRegisterAndSendDocuments(id: UUID, documentType: DocumentType, documents: UploadFile[], utmMedium?: any, utmCampaign?: any): Promise<any> {
  const body = documents;
  const params = {
    id,
    tipoDocumento: documentType,
    utmMidia: utmMedium || null,
    utmCampanha: utmCampaign || null
  };

  const urlParams = new URLSearchParams(params);
  const url = new URL(API_URL + '/Cadastro/ConcluirCadastro?'+urlParams)
  return (await axios.post(url.toString(), body))?.data
}

export async function sendValidationCode(id: UUID): Promise<boolean> {
  const url = new URL(API_URL + '/Cadastro/EnviarCodigoValidacao/' + encodeURIComponent(id))
  return (await axios.get(url.toString()))?.data
}

export async function resendValidationCode(id: UUID): Promise<boolean> {
  const url = new URL(API_URL + '/Cadastro/ReenviarCodigoValidacao/' + encodeURIComponent(id))
  return (await axios.get(url.toString()))?.data
}

export async function checkValidationCode(id: UUID, code: string): Promise<number> {
  const url = new URL(API_URL + `/Cadastro/ValidarCodigoSeguranca/${id}/${code}`)
  return (await axios.get(url.toString()))?.data
}