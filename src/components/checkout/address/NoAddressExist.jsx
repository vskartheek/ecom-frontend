import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { MdLocationOn, MdAdd } from 'react-icons/md';

const NoAddressExist = ({ onAddAddress }) => (
    <Box className="flex items-center justify-center min-h-[400px] p-4">
        <Paper className="p-8 text-center max-w-md w-full shadow-lg">
            <Box className="mb-6">
                <MdLocationOn 
                    className="text-gray-400 mx-auto mb-4" 
                    size={80}
                />
            </Box>
            <Typography 
                variant="h4" 
                component="h2" 
                className="mb-4 text-gray-800 font-semibold"
            >
                No Shipping Address
            </Typography>
            
            <Typography 
                variant="body1" 
                className="mb-6 text-gray-600 leading-relaxed"
            >
                You haven't added any shipping addresses yet. Add one to complete your order.
            </Typography>
        </Paper>
    </Box>
);

export default NoAddressExist;