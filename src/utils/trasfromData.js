
// Función para formatear fecha en español
export const formatDateToSpanish = (dateString) => {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} de ${month} de ${year}`;
}; 

export const transformDataPerson = (data) => {
  return data.map((item) => ({
    id: item.email,
    title: item.full_name,
    subtitle: item.email,
    subValue: `${item.team} - ${item.role}`,
  }));
};

export const transformDataCertType = (data) => {
  return data.map((item) => ({
    id: item.id,
    title: item.nombre,
    subtitle: item.tipo,
    subValue: ``,
  }));
};

export const transformDataReconocimientos = (data) => {
  return {
    id: data.id,
    name: data.nombre_colaborador,
    type: data.cert_type_nombre,
    date: data.created_at,
  };
};