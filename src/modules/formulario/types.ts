import jsPDF from "jspdf";

export interface FormularioData {
    email: string;
    nomeTitularPrincipal: string;
    nomeTitularSecundario: string;
    dataNascimento: string;
    cpf: string;
    rg: string;
    orgaoExpeditor: string;
    uf: number; 
    telefone: string;
    estadoCivil: string;
    endereco: string;
    bairro: string;
    cidade: string;
    pais: string;
    cep: number;
    cota: number;
    bloco: number; 
    apartamento: number;
    opcaoPagamento: number;
    segundoTitular: boolean;
}

export const initialForm: FormularioData = {
    email: "",
    nomeTitularPrincipal: "",
    nomeTitularSecundario: "",
    dataNascimento: "",
    cpf: "",
    rg: "",
    orgaoExpeditor: "",
    uf: null, 
    telefone: "",
    estadoCivil: "",
    endereco: "",
    bairro: "",
    cidade: "",
    pais: "",
    cep: null,
    cota: null,
    bloco: null,
    apartamento: null,
    opcaoPagamento: null,
    segundoTitular: false
}

export type jsPDFWithPlugin = jsPDF & {
    lastAutoTable?: {
      finalY: number;
    };
  };