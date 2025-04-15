import { Box, Typography } from "@mui/material";
import { ContatoItemProps } from "./types";

const ContatoItem = ({ icone, label, valor, link }: ContatoItemProps) => {
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
      <Box sx={{ fontSize: 40, color: "#C5A059", mb: 1 }}>{icone}</Box>
      <Typography sx={{ fontWeight: 600, color: "#D4D3D2" }}>{label}</Typography>
      {link ? (
        <Typography component="a" href={link} target="_blank" rel="noopener noreferrer" sx={{ color: "#C5A059", textDecoration: "none" }}>
          {valor}
        </Typography>
      ) : (
        <Typography sx={{ color: "#C5A059" }}>{valor}</Typography>
      )}
    </Box>
  );
};

export default ContatoItem;
