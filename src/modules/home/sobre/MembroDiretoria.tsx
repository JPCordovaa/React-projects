import { Box, Typography, Avatar } from "@mui/material";
import { MembroDiretoriaProps } from "./types";

const MembroDiretoria = ({ nome, titulo, foto }: MembroDiretoriaProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        textAlign: "center",
      }}
    >
      <Avatar
        src={foto}
        alt={nome}
        sx={{
          width: 120,
          height: 120,
          border: "3px solid #C5A059",
        }}
      />
      <Typography sx={{ fontWeight: 600, marginTop: 1, color: "#D4D3D2" }}>{titulo}</Typography>
      <Typography sx={{ color: "#C5A059" }}>{nome}</Typography>
    </Box>
  );
};

export default MembroDiretoria;
