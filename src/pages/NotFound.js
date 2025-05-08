import { Container, Typography, Button, Box, Paper } from "@mui/material"
import { Link } from "react-router-dom"
import { SentimentVeryDissatisfied } from "@mui/icons-material"

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <SentimentVeryDissatisfied sx={{ fontSize: 100, color: "text.secondary", mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button component={Link} to="/" variant="contained" color="primary" size="large">
            Go to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default NotFound
