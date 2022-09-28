import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import * as Posts from '../service/posts';

const Textarea: FC = () => {
  const handleSubmit = (e: any) => {
    if (!e.shiftKey && e.keyCode === 13) {
      Posts.create(e.target.value);
      e.target.value = null;
    }
  }

  return <>
    <TextareaAutosize
      minRows={3}
      maxLength={512}
      onKeyUp={handleSubmit}
      aria-label="comment-textarea"
      placeholder="Magsulat"
      style={{ width: '100%', maxWidth: '100%' }}
    />
  </>
}

const Home: FC = () => {
  const [posts, setPosts] = useState<Posts.Post[]>([]);

  useEffect(() => {
    const unsub = Posts.getRealtime(doc => {
      setPosts(doc.docs.map(d => d.data()) as Posts.Post[])
    });
  }, [])

  return (
    <Box id="home" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Textarea />

      <Typography variant="h5" mb={1} mt={2}>
        Mga post
      </Typography>
      {posts?.length > 0 && posts.map((post, i) => {
        return (
          <Link href={`/${post?.id}`} key={i} style={{ textDecoration: 'none', color: '#333333' }} >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" component="div">
                {post?.title}
              </Typography>
              <Typography>{new Date(post?.date).toLocaleDateString()}</Typography>
            </Box>
          </Link>
        )
      })}
    </Box>
  )
}

export default Home;