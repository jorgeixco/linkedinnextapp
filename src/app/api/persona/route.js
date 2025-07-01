import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, full_name, url_image, team, role } = body;

    // Validar campos requeridos
    if (!email || !full_name || !team || !role) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: email, full_name, team, role' },
        { status: 400 }
      );
    }

    // Crear la persona en el backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/persona`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        full_name,
        url_image: url_image || '',
        team,
        role
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Error al crear persona' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error('Error en POST /api/persona:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Obtener todas las personas
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/persona`);

    if (!response.ok) {
      throw new Error('Error al obtener personas');
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error en GET /api/persona:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 