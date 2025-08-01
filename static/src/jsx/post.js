import React from 'react';
import { Typography, Box, Container, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import json_parse from './json_parse';

// Styled components
const PostContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  '& .post-content': {
    '& img': {
      maxWidth: '100%',
      height: 'auto',
      margin: theme.spacing(2, 0),
    },
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      margin: theme.spacing(3, 0, 2),
    },
    '& p': {
      margin: theme.spacing(2, 0),
      lineHeight: 1.8,
    },
  },
}));

const PostTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const PostDate = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.secondary,
}));

export default function PostDisplay({ post }) {
  const post_dict = json_parse(post);

  return (
    <PostContainer maxWidth="md">
      <Box component="article">
        <PostTitle variant="h3" component="h1">
          {post_dict.title}
        </PostTitle>
        <PostDate variant="subtitle1" color="textSecondary">
          {post_dict.posted_time}
        </PostDate>
        <Divider sx={{ mb: 4 }} />
        <Box
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post_dict.body }}
          sx={{
            '& a': {
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          }}
        />
        <Divider sx={{ mt: 4 }} />
      </Box>
    </PostContainer>
  );
}
