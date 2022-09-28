import { collection, doc, DocumentData, getDocs, onSnapshot, query, QuerySnapshot, setDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Post {
  id: number;
  title: string;
  date: number;
  category?: string;
}

const ref = collection(db, 'posts');

export const all = async (): Promise<Post[]> => {
  const snapshot = await getDocs(ref);
  const posts: Post[] = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    posts.push(data as Post);
  })

  return posts;
}

export const get = async (id: string | undefined): Promise<Post> => {
  const q = query(ref, where('id', '==', Number(id)));
  const snapshot = await getDocs(q);
  return snapshot.docs[0].data() as Post;
}

export const create = async (title: string) => {
  const id = (await getDocs(ref)).size + 1;
  const category = 'home';

  await setDoc(doc(db, `posts/${id}`), {
    title,
    id,
    date: Date.now()
  })
}

export const getRealtime = (fn: (doc: QuerySnapshot<DocumentData>) => void) => onSnapshot(ref, fn);