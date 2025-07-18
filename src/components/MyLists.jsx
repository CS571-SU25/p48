import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Paper } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlaceIcon from '@mui/icons-material/Place';

// Will change later with LocalStorage maybe?
const dummyLists = [
    { id: 1, name: 'My Favorite Cafes', items: 5, icon: <FavoriteBorderIcon /> },
    { id: 2, name: 'Madison Trip Plan', items: 8, icon: <PlaceIcon /> },
    { id: 3, name: 'Weekend Restaurants', items: 3, icon: <FolderIcon /> },
];

export default function MyLists() {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: 'text.primary' }}>
                    My Lists
                </Typography>

                <Paper elevation={3} sx={{ borderRadius: '16px' }}>
                    <List sx={{ p: 0 }}>
                        {dummyLists.map((list, index) => (
                            <React.Fragment key={list.id}>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ p: 2 }}>
                                        <ListItemIcon sx={{ minWidth: 40 }}>
                                            {list.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={list.name}
                                            secondary={`${list.items} items`}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                {index < dummyLists.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Container>
        </Box>
    );
}