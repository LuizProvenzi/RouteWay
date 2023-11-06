import dynamic from 'next/dynamic'
import 'react-toastify/dist/ReactToastify.css'
import { Inter } from '@next/font/google'
import { ToastContainer } from 'react-toastify'
import { GlobalStyles } from './globals'

export const metadata = {
  title: 'Route Way'
}

const inter = Inter({
  subsets: ['latin']
})

const DynamicLayoutWithNoSSR = dynamic(() => import('./lib/registry'), {
  ssr: false
})

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>
        <DynamicLayoutWithNoSSR>
          <GlobalStyles />
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="colored"
          />
          {children}
        </DynamicLayoutWithNoSSR>
      </body>
    </html>
  )
}
