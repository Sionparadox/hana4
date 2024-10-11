import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { pathname, searchParams, host } = req.nextUrl;
  return NextResponse.json({
    pathname,
    q: searchParams.get('q'),
    ip: req.ip || host,
    // cookies: req.cookies.getAll(),
  });
}
