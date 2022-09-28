import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom"
import StickyFooter from "./layout/footer"
import Header from "./layout/header"
import Home from "./pages/home"
import View from './pages/view'

function App() {
  return (
    <div className="App">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Router >
            <Routes>
              <Route path='/:id' element={<View />} />
              <Route path='/*' element={<Home />} />
            </Routes>
          </Router>
        </Container>
        <StickyFooter />
      </Box>
    </div>
  )
}

export default App
