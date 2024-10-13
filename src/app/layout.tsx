export const metadata = {
  title: 'CineInfo',
  description: 'Pagina de catalogo de filmes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
