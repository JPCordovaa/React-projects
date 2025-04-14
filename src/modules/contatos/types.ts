import { ReactNode } from "react";

export interface ContatoItemProps {
    icone: ReactNode;
    label: string;
    valor: string;
    link?: string;
  }