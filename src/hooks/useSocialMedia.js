'use client';
export const useSocialMedia = () => {
      const handleLinkedInShare = (certificate) => {
        const url = `${window.location.origin}/certificate/${certificate.id}`;
        const text = `¡Acabo de obtener mi certificación en ${certificate.type}! 💪`;
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`;
        window.open(linkedinUrl, "_blank");
      };

      const handleTwitterShare = (certificate) => {
        const url = `${window.location.origin}/certificate/${certificate.id}`;
        const text = `¡Acabo de obtener mi certificación en ${certificate.type}! 💪`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, "_blank");
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
  };
};
