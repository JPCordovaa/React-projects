import { Box, Grid2, Typography } from "@mui/material";
import MembroDiretoria from "./MembroDiretoria";
import { membros } from "./ListaMembros";

const Diretoria = () => {
  return (
    <Box sx={{ padding: 4, marginTop: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 3, color: "#D4D3D2" }}>
        Diretoria
      </Typography>
      <Grid2 container spacing={4} justifyContent="space-around">
        {membros.map((membro, index) => (
          <Grid2 key={index}>
            <MembroDiretoria {...membro} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Diretoria;
