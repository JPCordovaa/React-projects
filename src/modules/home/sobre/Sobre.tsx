import { Box, Button, Grid2, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const Sobre = () => {

    return (
        <Box sx={{ fontSize: 12, border: '1px solid #C9D9F0', borderRadius: 4, padding: "25px", marginTop: 10, color: "white" }}>
            <Grid2>
                <Typography variant="h4" mb={5}>Sobre a Associação</Typography>
                <Typography>
                    texto com descrição de quão maravilhosa é essa associação e como ela pode mudar a vida de todos os seus contribuintes e associados
                </Typography>
                <Grid2 container mt={2} spacing={2}>
                    <Grid2>
                        <Button
                            variant="outlined"
                            color="info"
                            component="a"
                            href="/estatuto.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Estatuto
                        </Button>
                    </Grid2>
                    <Grid2>
                        <Button variant="outlined" component={RouterLink} to="/associe-se">
                            Seja um Associado!
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Sobre;
