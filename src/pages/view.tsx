import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Comments from '../service/comments';
import * as Posts from '../service/posts';

const Title: FC<Posts.Post> = ({ title, date, category }) => {
  return <Box mb={6}>
    <Typography variant="h5" mb={1}>
      {title}
    </Typography>
    {/* <Chip variant="outlined" label={category} /> */}
    <Typography variant="caption">
      {new Date(date).toLocaleDateString()}
    </Typography>
  </Box>
}

const ActionButton: FC<PropsWithChildren<{ onClick?: (e: any) => void }>> = ({ children, onClick }) => {
  return <>
    <Button onClick={onClick} sx={{ minWidth: 'unset', gap: 1, color: 'inherit' }}>{children}</Button>
  </>
}

const CommentDetails: FC<Comments.Comment> = (props) => {
  const handleUpvote = (commentId: number) => {
    Comments.upvote(commentId);
  }

  const handleDownvote = (commentId: number) => {
    Comments.downvote(commentId);
  }

  return <Card variant="outlined" sx={{
    mb: 2,
    p: 2,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 1.5
  }}>
    <Box sx={{ position: 'absolute', top: 0, right: 0, m: 1, display: 'flex', alignItems: 'center' }}>
      <ActionButton onClick={() => handleUpvote(props.id)}><ArrowUpwardOutlinedIcon /></ActionButton>
      <div>{props.voteCount}</div>
      <ActionButton onClick={() => handleDownvote(props.id)}><ArrowDownwardOutlinedIcon /></ActionButton>
    </Box>
    <Typography variant="caption">{new Date(props.date).toLocaleDateString()}</Typography>
    <Typography variant="body2">{props.comment}</Typography>
  </Card>
}

const CommentList: FC = () => {
  let { id } = useParams();
  const [comments, setComments] = useState<Comments.Comment[]>([]);

  useEffect(() => {
    Comments.getRealtime(doc => {
      setComments(doc.docs.map(d => d.data()).filter(c => c.postId == id) as Comments.Comment[])
    });
  }, []);

  return <div>
    {comments.map((comment, i) => <CommentDetails key={i} {...comment} />)}
  </div>
}

const CommentBox: FC = () => {
  let { id } = useParams();

  const handleSubmit = (e: any) => {
    if (!e.shiftKey && e.keyCode === 13) {
      Comments.create(id, e.target.value);
      e.target.value = null;
    }
  }

  return <>
    <TextareaAutosize
      onKeyUp={handleSubmit}
      aria-label="comment-textarea"
      placeholder="Magsulat ng palusot"
      style={{ width: '100%', maxWidth: '100%' }}
    />
  </>
}

const View: FC = () => {
  let { id } = useParams();
  const [post, setPost] = useState<Posts.Post>();

  useEffect(() => {
    fetchPost(id);
  }, [])

  const fetchPost = async (id: string | undefined) => {
    setPost(await Posts.get(id));
  }

  return <>
    {
      post &&
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Link href=".."
            style={{
              textDecoration: 'none',
              color: 'grey',
              display: 'flex',
              alignItems: 'center'
            }}>
            <ChevronLeftOutlinedIcon />
            Bumalik
          </Link>
        </Box>
        <Title {...post} />
        <CommentList />
        <CommentBox />
      </Box>
    }
  </>
}

export default View;