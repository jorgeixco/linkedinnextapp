import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { code, certificate } = await request.json();

  if (!code) {
    return NextResponse.json({ error: "Missing code en callback" }, { status: 400 });
  }

  try {
    const tokenResp = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI,
        client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResp.data.access_token;
    console.log("✅ Access token obtenido:", accessToken);

    // 2. Obtenemos la información del usuario
    const meResp = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    const userInfo = meResp.data;
    console.log("✅ Usuario autenticado:", userInfo.name);

    // Usamos los datos del certificado pasado desde el cliente
    const certId = certificate?.id || `POC-${Date.now()}`; 
    const certUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000'}/certificate/${certId}`;
    const certName = certificate?.type || "Certificado POC";
    const issuerName = "Mi Compañía de Prueba";
    const currentDate = new Date();
    const issueMonth = currentDate.getMonth() + 1;
    const issueYear = currentDate.getFullYear();

    const linkedinUsername = "me"; 

    const linkedinCertUrl = new URL(`https://www.linkedin.com/in/${linkedinUsername}/edit/forms/certification/new/`);
    
    linkedinCertUrl.searchParams.append('certId', certId);
    linkedinCertUrl.searchParams.append('certUrl', certUrl);
    linkedinCertUrl.searchParams.append('isFromA2p', 'true');
    linkedinCertUrl.searchParams.append('issueMonth', issueMonth.toString());
    linkedinCertUrl.searchParams.append('issueYear', issueYear.toString());
    linkedinCertUrl.searchParams.append('name', certName);
    
    return NextResponse.json({
      linkedinCertUrl: linkedinCertUrl.toString(),
      userInfo,
    });

  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
    return NextResponse.json({ error: "Error en el proceso" }, { status: 500 });
  }
}
