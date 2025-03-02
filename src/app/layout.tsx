import { Inter } from 'next/font/google'
import "./globals.css"
const inter = Inter({ subsets: ['latin'] })
import '@fontsource/inter';

export const metadata = {
  title: 'CineInfo',
  description: 'Pagina de catalogo de filmes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
})  {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
