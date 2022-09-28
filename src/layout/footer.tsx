import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const Copyright: FC = () => {
  return (
    <Typography variant="caption">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const StickyFooter: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200]
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2">
          Pag may gusot, may palusot.
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default StickyFooter