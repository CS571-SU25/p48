import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import { 
  Restaurant as RestaurantIcon,
  Map as MapIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon
} from '@mui/icons-material';

export default function About() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundColor: 'var(--bg-color, #f0f2f5)',
        pt: '80px',
        pb: 2,
        overflow: 'auto',
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: 'text.primary', textAlign: 'center' }}>
          About Pinpoint
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Mission Statement */}
          <Paper elevation={3} sx={{ borderRadius: '16px', p: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6, textAlign: 'center' }}>
              Pinpoint bypasses conventional user rating systems to ensure recommendations are free from promotional bias. 
              All destinations are carefully selected by our expert squad of food writers and local editors to guarantee 
              quality and integrity of information.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, textAlign: 'center' }}>
              Discover exceptional dining experiences through curated recommendations that you can trust.
            </Typography>
          </Paper>

          {/* Contact */}
          <Paper elevation={3} sx={{ borderRadius: '16px', p: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, textAlign: 'center' }}>
              Have a suggestion for a great place? Want to join our expert squad? 
              We'd love to hear from you.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, textAlign: 'center', mt: 2 }}>
              Email: hello@pinpoint.com
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
} 