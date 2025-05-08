import { Container, Typography, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/" size="large">
          Go to Home
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
