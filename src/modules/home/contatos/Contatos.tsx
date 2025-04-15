import { Box, Grid2, Typography } from "@mui/material";
import ContatoItem from "./ContatoItem";
import { contatos } from "./ListaContatos";

const Contatos = () => {
  return (
    <Box sx={{ padding: 4, marginTop: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 3, color: "#D4D3D2" }}>
        Contatos
      </Typography>
      <Grid2 container spacing={4} justifyContent="space-around">
        {contatos.map((contato, index) => (
          <Grid2 key={index}>
            <ContatoItem {...contato} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Contatos;
