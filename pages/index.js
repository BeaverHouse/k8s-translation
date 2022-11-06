import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <div className='text-center'>
      <h1>Udemy 강의 영어 해석을 적는 사이트입니다.</h1>
      <Link style={{color: "blue"}} href={`https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/`}>
        강의 링크
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0' style={{marginTop: '20px'}}>
        {posts.map(({ slug, frontmatter }) => (
          <div
            key={slug}
            className='border bg-yellow-200 border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col'
            style={{textAlign: "center"}}
          >
            <Link href={`/post/${slug}`}>
                <b style={{fontSize: "50px"}}>{frontmatter.lecture}</b>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync('posts');

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);
    
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}