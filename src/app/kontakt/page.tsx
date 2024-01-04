import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const Kontakt = () => (
  <Container>
    <Box pb={2}>
      <Typography variant="h1">Jonas Jönsson</Typography>
      <Typography variant="h4" sx={{ mt: 1 }}>
        hndktsk@gmail.com (hund kat(t) sko)
      </Typography>
      <Typography variant="h4" sx={{ mt: 1 }}>
        0702 311 545
      </Typography>
    </Box>
    <Box>
      <Image
        src="/akihabara.jpg"
        alt="En dröm att få komma till Akihabara i Tokyo!"
        width={1000}
        height={750}
      />
    </Box>
  </Container>
);
export default Kontakt;
