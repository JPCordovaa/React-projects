import { Box, Grid2, Typography } from "@mui/material";
import MembroDiretoria from "./MembroDiretoria";
import { membros } from "./commons";

const Diretoria = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 3 }}>
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
