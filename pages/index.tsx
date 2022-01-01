import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import useSWR from 'swr';
import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

interface P {
  posts: {
    slug: string;
    title: string;
    content: string;
  }[]
}

const Home: React.FC<P> = ({ posts }) => {
  const fetcher = async (url: string): Promise<boolean | null> => {
    const response = await fetch(url);
    return response.json();
  }

  const { data: isLoggedIn } = useSWR('/api/user', fetcher);

  return (
    <div>
      {isLoggedIn
        ? (
          <>
            {posts.map((post) => {
              return (
                <div key={post.slug}>
                  <Link href={`/posts/${post.slug}`}>
                    <a aria-label={post.title}>
                      {post.title}
                    </a>
                  </Link>
                </div>
              )
            })}
          </>
        )
        : null
      }
    </div>
  )
}

export default Home
