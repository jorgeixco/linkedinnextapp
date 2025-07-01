import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  // Si hay error OAuth
  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(new URL(`/?error=${error}`, request.url));
  }

  if (!code) {
    console.error('No code received');
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    // Verificar state para seguridad (opcional, pero recomendado)
    console.log('OAuth callback exitoso, procesando code...');

    // Intercambiar el código por un token de acceso
    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;

    // Obtener token de acceso
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Obtener información del perfil del usuario
    const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const userProfile = profileResponse.data;
    console.log('Perfil de usuario obtenido:', userProfile);

    // Redirigir al home con los datos del usuario
    const homeUrl = new URL('/', request.url);
    homeUrl.searchParams.set('success', 'true');
    homeUrl.searchParams.set('user', encodeURIComponent(JSON.stringify(userProfile)));
    
    return NextResponse.redirect(homeUrl);

  } catch (error) {
    console.error('❌ Error en OAuth callback:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
} 