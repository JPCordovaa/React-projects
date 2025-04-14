import { Box, Grid2, Typography } from "@mui/material";
import ContatoItem from "./ContatoItem";
import { contatos } from "./ListaContatos";

const Contatos = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 3 }}>
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
