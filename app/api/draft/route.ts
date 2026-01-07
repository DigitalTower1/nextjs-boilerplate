import { validatePreviewUrl } from '@sanity/visual-editing/next-pages-router'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const client = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  (await draftMode()).enable()

  // Redirect to the path of the project being edited
  redirect(slug ? `/work/${slug}` : '/')
}