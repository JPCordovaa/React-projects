import { Grid2, Link, Typography } from "@mui/material";
import { UnidadeNoticiaProps } from "./types";

const UnidadeNoticia = ({ data, instituicao, titulo, url }: UnidadeNoticiaProps) => {
    return (
        <Grid2 container direction={"column"} sx={{marginBottom: 5}}>
            <Grid2 container alignItems={"center"}>
                <i className="fas fa-arrow-right-long" style={{ fontSize: 24, color: "lightgray", marginRight: 20 }}></i>
                <Grid2 container>
                    <Typography variant="body2" sx={{ color: "#007a33", fontWeight: "bold" }}>
                        {data}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#C5A059", fontWeight: "bold", textTransform: "uppercase" }}>
                        | {instituicao}
                    </Typography>
                </Grid2>
            </Grid2>
            <Grid2 sx={{ marginLeft: "44px"}}>
                <Link href={url} underline="none" sx={{ color: "black", fontWeight: 500, fontSize: 18 }}>
                    {titulo}
                </Link>
            </Grid2>
        </Grid2>
    );
};

export default UnidadeNoticia;
