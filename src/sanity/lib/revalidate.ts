import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody(req, process.env.SANITY_REVALIDATE_SECRET);
    
    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    // Target the specific cache tag we defined in getProject()
    revalidateTag(body._type);
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
