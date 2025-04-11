import { Grid2 } from "@mui/material";
import logo from '../../assets/associacaoMarina.png';
import ResponsiveAppBar from "./ResponsiveAppBar";


const Header = () => {
    return (
        <>
            <Grid2 container style={{ backgroundColor: "#5BD4D9", alignItems: "center", borderRadius: 4, width: "100%" }} color={"black"}>
                <Grid2 size={3}>
                    <img src={logo} alt="Logo da associação" style={{ height: 60, margin: 5, borderRadius: 12 }} />
                </Grid2>
                <Grid2 size={4} sx={{ fontSize: 28 }}>
                    Associados Marina Flat
                </Grid2>
                <Grid2 size={5}>
                    <ResponsiveAppBar />
                </Grid2>
            </Grid2>
        </>
    )
}

export default Header;
