import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { email } = params;

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Obtener la persona por email del backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/persona/${encodeURIComponent(email)}`);

    if (response.status === 404) {
      return NextResponse.json(
        { error: 'Persona no encontrada', message: `No se encontró una persona con el email: ${email}` },
        { status: 404 }
      );
    }

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Error al obtener persona' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error en GET /api/persona/[email]:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 