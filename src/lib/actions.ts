"use server";

import { wixClientServer } from "./wixClientServer";
import { NextResponse } from 'next/server';
import { createClient, OAuthStrategy } from "@wix/sdk";

export const updateUser = async (formData: FormData) => {
  const wixClient = await wixClientServer();

  const id = formData.get("id") as string;
  const username = formData.get("username") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  console.log(username);

  try {
    const response = await wixClient.members.updateMember(id, {
      contact: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phones: [phone] || undefined,
      },
      loginEmail: email || undefined,
      profile: { nickname: username || undefined },
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const wixClient = createClient({
      auth: OAuthStrategy({ 
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      })
    });

    const tokens = await wixClient.auth.getMemberTokens(code);
    
    const response = NextResponse.redirect(new URL('/', request.url));
    
    response.cookies.set('refreshToken', JSON.stringify(tokens.refreshToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }
}
