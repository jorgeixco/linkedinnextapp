import { NextResponse } from 'next/server'

export async function POST(request) {
  const { code } = await request.json()

  // Here you would exchange the code for an access token from LinkedIn
  // and then fetch the user's profile information.
  // For now, we'll just return a dummy user profile.

  console.log(`Received code: ${code}`)

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com'
  }

  return NextResponse.json(userProfile)
}
