import { AppBar, Box, Button, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


const ResponsiveAppBar = () => {
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [hoveredPage, setHoveredPage] = React.useState<string | null>(null);
	const [mobileSubmenu, setMobileSubmenu] = React.useState<string | null>(null);

    const pages = React.useMemo(
		() => [
			{ title: "Sobre",
                subpages: [
					{ title: "Dados do Usuário", url: "/usuarios/DadosUsuario" },
					{ title: "Consultar Usuários", url: "/usuarios/cadastro"},
					{ title: "Incluir Plantonista", url: "/usuarios/incluirUsuarioTema"},
				],
             },
			{ title: "Benefícios", url: "/consultas" },
			{ title: "Faça parte", url: "/suporte" },
			{ title: "Contato", url: "/estatisticas" },
        ],[])

        const handleMenuClick = React.useCallback(
            (url: string) => {
				navigate(url);
                setAnchorElNav(null);
                setHoveredPage(null);
                setMobileSubmenu(null);
            },
            [history]
        );
        
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleMobileMenuClick = (title: string) => {
		setMobileSubmenu(mobileSubmenu === title ? null : title);
	};

    return (
		<AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "0px 0px 0px rgb(0 0 0)", maxHeight: 40 }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none", alignItems: "flex-start" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
						>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={() => setAnchorElNav(null)}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<div key={page.title}>
									<MenuItem onClick={() => handleMobileMenuClick(page.title)}>
										<Typography textAlign="center">{page.title}</Typography>
									</MenuItem>
									{mobileSubmenu === page.title && page.subpages?.length > 0 && (
										<Box sx={{ pl: 2 }}>
											{page.subpages.map((subpage) => (
												<Button

													key={subpage.title}
													onClick={() => handleMenuClick(subpage.url)}
													sx={{
														display: "block",
														color: location.pathname === subpage.url ? "black" : "#4a71db",
														fontFamily: "inherit",
														fontWeight: "bold",
														fontSize: "14.5px",
														lineHeight: "1.80",
														letterSpacing: "0.03em",
														padding: "8px 16px",
														backgroundColor: "#E2E8F8",
														width: "100%",
														"&:hover": {
															color: "black",
															cursor: "pointer",
														},
													}}
												>
													{subpage.title}
												</Button>
											))}
										</Box>
									)}
								</div>
							))}
						</Menu>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, position: "relative", marginBottom: "auto" }}>
						{pages.map((page, index) => (
							<React.Fragment key={page.title}>
								<Box sx={{ position: "relative" }} onMouseEnter={() => setHoveredPage(page.title)} onMouseLeave={() => setHoveredPage(null)}>
									<Button
										onClick={() => handleMenuClick(page.url)}
										sx={{
											color: location.pathname === page.url ? "black" : hoveredPage === page.title ? "black" : "#4a71db",
											display: "block",
											fontFamily: "inherit",
											fontWeight: "bold",
											fontSize: "14.5px",
											lineHeight: "1.80",
											letterSpacing: "0.03em",
										}}
									>
										{page.title}
									</Button>
									{hoveredPage === page.title && page.subpages?.length > 0 && (
										<Box
											sx={{
												position: "absolute",
												top: "100%",
												left: 0,
												backgroundColor: "white",
												zIndex: 1,
												boxShadow: 1,
												width: "max-content",
											}}
										>
											{page.subpages.map((subpage) => (
												<Button
													key={subpage.title}
													onClick={() => {
															handleMenuClick(subpage.url);
													}}
													sx={{
														display: "block",
														color: "#4a71db",
														fontFamily: "inherit",
														fontWeight: "bold",
														fontSize: "14.5px",
														lineHeight: "1.80",
														letterSpacing: "0.03em",
														padding: "8px 16px",
														backgroundColor: "#E2E8F8",
														width: "100%",
														pointerEvents: "auto",
														"&:hover": {
															color: "black",
															cursor: "pointer",
														},
													}}
												>
													{subpage.title}
												</Button>

											))}
										</Box>
									)}
								</Box>
								{!(index === pages.length - 1) && (
									<Divider
										orientation="vertical"
										variant="middle"
										flexItem
										sx={{
											alignSelf: "center",
											height: "20px",
										}}
									/>
								)}
							</React.Fragment>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default ResponsiveAppBar;