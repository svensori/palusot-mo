import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Header = () => {
  return <Box
    sx={{
      py: 3,
      px: 2,
      backgroundColor: (theme) => theme.palette.grey[200]
    }}
    component="header"
  >
    <Typography variant="h4">
      Palusot.mo
    </Typography>
  </Box>
}

export default Header;