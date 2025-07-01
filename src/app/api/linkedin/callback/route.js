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
    return new NextResponse(`
      <html>
        <body>
          <script>
            window.opener?.postMessage({
              type: 'LINKEDIN_AUTH_ERROR',
              error: '${error}'
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  if (!code) {
    console.error('No code received');
    return new NextResponse(`
      <html>
        <body>
          <script>
            window.opener?.postMessage({
              type: 'LINKEDIN_AUTH_ERROR',
              error: 'no_code'
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  try {
    // Verificar state para seguridad (opcional, pero recomendado)
    console.log('OAuth callback exitoso, procesando code...');

    // Enviar el código de vuelta al popup opener
    return new NextResponse(`
      <html>
        <body>
          <script>
            window.opener?.postMessage({
              type: 'LINKEDIN_AUTH_SUCCESS',
              code: '${code}',
              state: '${state || ''}'
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('❌ Error en OAuth callback:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

    return new NextResponse(`
      <html>
        <body>
          <script>
            window.opener?.postMessage({
              type: 'LINKEDIN_AUTH_ERROR',
              error: 'auth_failed'
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
} 