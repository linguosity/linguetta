// /Users/bbrewer/Documents/Code/Linguosity/linguetta/middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.next()
}