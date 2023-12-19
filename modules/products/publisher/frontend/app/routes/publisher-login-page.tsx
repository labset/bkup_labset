import { publisherGateway } from "@labset-publisher-frontend/publisher-gateway-component";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const PublisherLoginPage = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 4 }}>
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Publisher</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          href={`${publisherGateway.url}/auth/google`}
        >
          Continue with google
        </Button>
      </Stack>
    </Container>
  );
};

export { PublisherLoginPage };
