import { Email, Phone, Instagram, Facebook } from "@mui/icons-material";

export const contatos = [
  {
    icone: <Email />,
    label: "E-mail",
    valor: "contato@exemplo.com",
    link: "mailto:contato@exemplo.com",
  },
  {
    icone: <Phone />,
    label: "Telefone",
    valor: "(11) 99999-9999",
    link: "tel:+5511999999999",
  },
  {
    icone: <Instagram />,
    label: "Instagram",
    valor: "@instituicao",
    link: "https://instagram.com/instituicao",
  },
  {
    icone: <Facebook />,
    label: "Facebook",
    valor: "/instituicao",
    link: "https://facebook.com/instituicao",
  },
];