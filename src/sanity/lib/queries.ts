import { sanityFetch } from './client'

export async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    hoverVideo,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    content[] {
      ...,
      _type == "image" => {
        asset->{ _id, url, metadata { lqip } }
      }
    }
  }`

  return sanityFetch({
    query,
    params: { slug },
    tags: [`project:${slug}`],
  })
}