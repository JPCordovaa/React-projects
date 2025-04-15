import { Grid2 } from "@mui/material";
import logo from '../../assets/associacaoMarina.png';
import ResponsiveAppBar from "./ResponsiveAppBar";


const Header = () => {
    return (
        <>
            <Grid2 container style={{ alignItems: "center", borderRadius: 4, width: "100%" }} color={"white"}>
                <Grid2 size={4}>
                    <img src={logo} alt="Logo da associação" style={{ height: 180, margin: 5, borderRadius: 360, backgroundColor: "white" }} />
                </Grid2>
                <Grid2 size={8}>
                    <ResponsiveAppBar />
                </Grid2>
            </Grid2>
        </>
    )
}

export default Header;
