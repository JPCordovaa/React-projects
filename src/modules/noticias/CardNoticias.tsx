import UnidadeNoticia from "./UnidadeNoticia";
import { noticias } from "./ListaNoticias";
import imagem from "../../assets/associacaoMarina.png"
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";

const CardNoticias = () => {
    const noticiasOrdenadas = [...noticias]
        .sort((a, b) => (a.data < b.data ? 1 : -1))
        .slice(0, 4);

    const formatarData = (data: string) => {
        const [ano, mes, dia] = data.split(".");
        return `${dia}.${mes}.${ano.slice(2)}`;
    };

    return (
        <Box sx={{ fontSize: 12, border: '1px solid #C9D9F0', borderRadius: 4, padding: "25px" }}>
            <Grid2 container>
                <Grid2 direction={"column"} size={6} alignItems={"flex-start"} >
                    <Grid2 container justifyContent={"space-between"}>
                        <Typography sx={{ fontSize: 16, fontWeight: 500, color: "#C5A059" }}>Últimas</Typography>
                        <Button >
                            MAIS NOTÍCIAS
                        </Button>
                    </Grid2>
                    <Grid2 sx={{ marginTop: "-5px" }}>
                        <Typography sx={{ fontSize: 28, fontWeight: 500, color: "#020381" }}>Notícias</Typography>
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
                    <Box
                        component="img"
                        src={imagem}
                        alt="Notícia em destaque"
                        sx={{
                            width: "400px",
                            height: "400px",
                            objectFit: "cover",
                            borderRadius: 2,
                        }}
                    />
                </Grid2>

            </Grid2>
        </Box>
    );
};

export default CardNoticias;
