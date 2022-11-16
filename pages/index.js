import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { useState } from 'react';

export default function Home({ posts }) {

  const [Search, setSearch] = useState("")

  return (
    <div className='text-center flex flex-col'>
      <h1>Udemy 강의 영어 해석을 적는 사이트입니다.</h1>
      <Link style={{color: "blue"}} href={`https://www.udemy.com/course/certified-kubernetes-administrator-with-practice-tests/`}>
        강의 링크
      </Link>
      <div style={{margin: "10px", width: '200px'}}>
        <input type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="강의 번호"
          value={Search}
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0' style={{marginTop: '20px'}}>
        {posts
        .filter(({ frontmatter }) => frontmatter.lecture.toString().includes(Search))
        .map(({ slug, frontmatter }) => (
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