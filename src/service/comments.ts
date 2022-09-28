import { collection, doc, DocumentData, getDoc, getDocs, onSnapshot, query, QuerySnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";

export interface Comment {
  id: number;
  itemId: number;
  comment: string;
  date: number;
  voteCount: number;
}

const ref = collection(db, 'comments');

export const get = async (id: string | undefined): Promise<Comment[]> => {
  const comments: Comment[] = [];
  const q = query(ref, where('postId', '==', Number(id)));

  const snapshot = await getDocs(q);

  snapshot.forEach(data => {
    comments.push({
      ...data.data()
    } as Comment)
  })

  return [...comments]
}

export const create = async (postId: string | undefined, comment: string) => {
  const id = (await getDocs(ref)).size + 1;

  await setDoc(doc(db, `comments/${id}`), {
    id,
    postId: Number(postId),
    comment,
    date: Date.now(),
    voteCount: 0,
  })
}

export const upvote = async (id: number | string) => {
  const commentId = Number(id);
  const commentRef = doc(db, `comments/${commentId}`);
  const { voteCount } = (await getDoc(commentRef)).data() as Comment;
  await updateDoc(doc(db, `comments/${commentId}`), {
    voteCount: voteCount + 1
  })
}

export const downvote = async (id: number | string) => {
  const commentId = Number(id);
  const commentRef = doc(db, `comments/${commentId}`);
  const { voteCount } = (await getDoc(commentRef)).data() as Comment;
  await updateDoc(doc(db, `comments/${commentId}`), {
    voteCount: voteCount - 1
  })
}

export const getRealtime = (fn: (doc: QuerySnapshot<DocumentData>) => void) => onSnapshot(ref, fn);