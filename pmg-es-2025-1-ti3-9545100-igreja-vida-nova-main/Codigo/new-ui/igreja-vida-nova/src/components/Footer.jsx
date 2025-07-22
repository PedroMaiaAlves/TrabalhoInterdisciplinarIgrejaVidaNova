import React from 'react';
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, IconButton } from '@mui/material';

const Footer = () => {
    return (
        <>
            <footer>
                <Box
                    component="footer"
                    sx={{
                    backgroundColor: "white",
                    color: "#fff",
                    padding: "16px",
                    textAlign: "center",
                    }}
                >
                    <IconButton
                        href="https://www.instagram.com/c.e.m.vida_nova"
                        target="_blank"
                        rel="noopener"
                        sx={{ color: "black" }}
                    >
                    <InstagramIcon />
                    </IconButton>
                    <p style={{ marginTop: "8px", fontSize: "14px",color: "black"}}>
                        © {new Date().getFullYear()} Igreja Vida Nova. Todos os direitos
                        reservados.
                    </p>
                </Box>
            </footer>
        </>
    );
}

export default Footer;