import { Box, Button, Grid2, Typography } from "@mui/material"

const Sobre = () => {
    return (
        <Box sx={{ fontSize: 12, border: '1px solid #C9D9F0', borderRadius: 4, padding: "25px" }}>
            <Grid2>
                <Typography>Sobre a Associação</Typography>
                <Typography>texto com descrição de quão maravilhosa é essa associação e como ela pode mudar a vida de todos os seus contribuintes e associados</Typography>
                <Button
                    variant="outlined"
                    component="a"
                    href="/estatuto.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Estatuto
                </Button>
            <Button>Seja um Associado!</Button>
        </Grid2>
        </Box >
    )
}

export default Sobre;