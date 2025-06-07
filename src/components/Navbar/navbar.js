"use client";

import React from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/#contact">Contact</Link>
        </li>
      </ul>


      <Link href = "/login" passHref>
        <button className={styles.loginButton}>Log In/Register</button>
      </Link>
    </nav>
  );
}
