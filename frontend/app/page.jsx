'use client'
import Link from 'next/link'
import { Wrapper } from './components'

export default function Home() {
  return (
    <main>
      <Wrapper>
        <Link href="/routerizer">Roterizador</Link>
      </Wrapper>
    </main>
  )
}
