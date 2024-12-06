"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface Provider {
  id: string;
  name: string;
}

export default function ProviderButtons() {
  const [providers, setProviders] = useState<Provider[] | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("/api/auth/providers");
        const data = await response.json();
        setProviders(Object.values(data));
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  if (!providers) {
    return <p>Loading providers...</p>;
  }

  return (
    <Stack spacing={2} alignItems="center">
      {providers.map((provider) => (
        <Button
          key={provider.id}
          variant="contained"
          onClick={() => signIn(provider.id)}
          sx={{
            textTransform: "none",
            minWidth: "200px",
            backgroundColor:
              provider.id === "google"
                ? "#4285F4"
                : provider.id === "facebook"
                ? "#4267B2"
                : "#333",
            "&:hover": {
              backgroundColor:
                provider.id === "google"
                  ? "#357ae8"
                  : provider.id === "facebook"
                  ? "#365899"
                  : "#555",
            },
          }}
        >
          Sign in with {provider.name}
        </Button>
      ))}
    </Stack>
  );
}
