import UnidadeNoticia from "./UnidadeNoticia";
import { noticias } from "./ListaNoticias";
import imagem from "../../../assets/associacaoMarina.png"
import { Box, Button, Divider, Grid2, Typography, useMediaQuery, useTheme } from "@mui/material";

const CardNoticias = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const noticiasOrdenadas = [...noticias]
        .sort((a, b) => (a.data < b.data ? 1 : -1))
        .slice(0, 4);

    const formatarData = (data: string) => {
        const [ano, mes, dia] = data.split(".");
        return `${dia}.${mes}.${ano.slice(2)}`;
    };

    return (
        <Box sx={{ fontSize: 12, border: '1px solid #C9D9F0', borderRadius: 4, padding: "25px", marginTop: 10, background: "linear-gradient(90deg,rgba(99, 107, 110, 1) 10%, rgba(212, 211, 210, 1) 88%)" }}>
            <Grid2 container>
                <Grid2 direction={"column"} size={isSmallScreen ? 12 : 6} alignItems={"flex-start"} >
                    <Grid2 container justifyContent={"space-between"}>
                        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#C5A059" }}>Últimas</Typography>
                        <Button variant="outlined" sx={{color:"#01416e", borderColor:"#01416e"}}>
                            MAIS NOTÍCIAS
                        </Button>
                    </Grid2>
                    <Grid2 sx={{ marginTop: "-18px" }}>
                        <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#01416e" }}>Notícias</Typography>
                    </Grid2>
                    <Divider sx={{ margin: "5px 0px 10px 0px" }} />
                    {noticiasOrdenadas.map((noticia, index) => (
                        <UnidadeNoticia
                            key={index}
                            data={formatarData(noticia.data)}
                            instituicao={noticia.instituicao}
                            titulo={noticia.titulo}
                            url={noticia.url}
                        />
                    ))}
                </Grid2>
                <Grid2
                    size={6}
                >
                    {!isSmallScreen &&(
                          <Box display="flex" justifyContent="center">
                        <Box
                        component="img"
                        src={imagem}
                        alt="Logo da Associação"
                        sx={{
                            width: "400px",
                            height: "400px",
                            borderRadius: 2,
                        }}
                    />
                    </Box>)}
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default CardNoticias;
