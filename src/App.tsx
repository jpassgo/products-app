import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import ProductsPage from './products/ProductsPage'
import { Box } from '@mui/material'

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />              
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.900", color: "white" }}>
        <ProductsPage />
      </Box>      
    </React.Fragment>
  )
}
