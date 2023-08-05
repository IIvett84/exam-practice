import { Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import React from "react";


const Subscription = () => {
    const [ isValidEmail, setIsValidEmail ] = useState(false);
    const [ email, setEmail] = useState("");
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [subscriptionMessage, setSubscriptionMessage] = useState("");

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);

        setIsValidEmail(value.includes("@") && value.includes("."));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValidEmail){
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(
              "https://demoapi.com/api/series/newsletter",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
              }
            );
      
            if (!response.ok) {
              throw new Error("Failed to subscribe.");
            }
            setSubscriptionMessage("Sibscribed");
            setTimeout(() => {
              setSubscriptionMessage("");
            }, 5000);
          } catch (error) {
            console.error("Error subscribing:", error);
            setSubscriptionMessage("Failed to subscribe");
          } finally {
            setIsSubmitting(false);
            setEmail("");
          }
        };

  return (
    <Box>
      <Typography variant="h2">Subscribe to our newsletter</Typography>
      <Box
        component="form"
        className="user-adder-form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
      >
        <TextField
          type="email"
          label="Type your e-mail address"
          id="userEmail"
          name="userEmail"
          onChange={handleEmailChange}
          disabled={isSubmitting}
          required
        />
        <Button variant="contained" type="submit" disabled={!isValidEmail || isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </Box>
    </Box>
  );
};

export default Subscription;
