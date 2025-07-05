import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '@mui/material';

const StatsPage = () => {
  const urls = JSON.parse(localStorage.getItem("links") || "[]");

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Shortened URL Stats
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Shortcode</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Expires At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url, i) => {
            const expiresAt = new Date(new Date(url.createdAt).getTime() + url.validity * 60 * 1000);
            return (
              <TableRow key={i}>
                <TableCell>{url.shortcode}</TableCell>
                <TableCell>{url.longUrl}</TableCell>
                <TableCell>{url.clicks}</TableCell>
                <TableCell>{expiresAt.toLocaleString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default StatsPage;
