'use client';
import { useState } from 'react';

export const useSocialMedia = () => {
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);

  const handleLinkedInShare = async (certificate) => {
    try {
      setIsLinkedInLoading(true);
      
      // Guardamos el certificado en localStorage para poder usarlo después del OAuth
      localStorage.setItem('pendingLinkedInShare', JSON.stringify(certificate));
      
      // Generamos una URL de autorización OAuth de LinkedIn
      const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
      const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI);
      const scope = encodeURIComponent('profile openid email w_member_social');
      const state = Math.random().toString(36).substring(7); // Para seguridad
      
      // Guardamos el state para verificarlo después
      localStorage.setItem('linkedinOAuthState', state);
      
      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
      
      // Abrimos ventana de autorización
      const authWindow = window.open(
        authUrl,
        'LinkedInAuth',
        'width=600,height=600,scrollbars=yes,resizable=yes'
      );
      
      // Escuchamos el mensaje del callback
      const handleMessage = async (event) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'LINKEDIN_AUTH_SUCCESS') {
          const { code } = event.data;
          await processLinkedInShare(code, certificate);
          authWindow?.close();
          window.removeEventListener('message', handleMessage);
        } else if (event.data.type === 'LINKEDIN_AUTH_ERROR') {
          console.error('Error en autenticación LinkedIn:', event.data.error);
          alert('Error al conectar con LinkedIn. Inténtalo de nuevo.');
          authWindow?.close();
          window.removeEventListener('message', handleMessage);
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Cleanup si la ventana se cierra manualmente
      const checkClosed = setInterval(() => {
        if (authWindow?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setIsLinkedInLoading(false);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error al iniciar compartir en LinkedIn:', error);
      alert('Error al compartir en LinkedIn. Inténtalo de nuevo.');
      setIsLinkedInLoading(false);
    }
  };

  const processLinkedInShare = async (code, certificate) => {
    try {
      const response = await fetch('/api/linkedin/publication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          certificate
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      
      if (data.linkedinCertUrl) {
        // Abrir la URL de LinkedIn para añadir el certificado
        window.open(data.linkedinCertUrl, '_blank');
        alert('¡Redirigiéndote a LinkedIn para añadir tu certificado!');
      }
      
    } catch (error) {
      console.error('Error al procesar publicación en LinkedIn:', error);
      alert('Error al procesar la publicación en LinkedIn.');
    } finally {
      setIsLinkedInLoading(false);
      // Limpiar datos temporales
      localStorage.removeItem('pendingLinkedInShare');
      localStorage.removeItem('linkedinOAuthState');
    }
  };

const handleTwitterShare = (certificate) => {
  const certUrl = `${window.location.origin}/certificate/${certificate.id}`;
  const text = `¡Aprobé el certificado de ${certificate.type}! 🎉 #NuncaParesDeAprender`;

  const twitterUrl = new URL("https://x.com/intent/post");
  twitterUrl.searchParams.append("text", `${text} ${certUrl}`);

  window.open(twitterUrl.toString(), "_blank");
};

  const handleDownload = (certificate) => {
    // Aquí implementarías la lógica para descargar el certificado como PDF/imagen
    console.log(`Descargando certificado ${certificate.id}`);
    // Por ejemplo, podrías usar html2canvas o jsPDF
  };

  const handleCopyLink = (certificate) => {
    const url = `${window.location.origin}/certificate/${certificate.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Enlace copiado al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar el enlace:", err);
      });
  };    

  return {
    handleLinkedInShare,
    handleTwitterShare,
    handleDownload,
    handleCopyLink,
    isLinkedInLoading,
  };
};
