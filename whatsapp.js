document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('whatsappTrigger');
  const popup = document.getElementById('whatsappPopup');
  const form = document.getElementById('whatsappForm');

  // Número de WhatsApp (reemplazar con el número real)
  const whatsappNumber = '34600000000';

  // Toggle popup
  trigger.addEventListener('click', () => {
    popup.classList.toggle('active');
  });

  // Cerrar popup cuando se hace clic fuera
  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && !trigger.contains(e.target)) {
      popup.classList.remove('active');
    }
  });

  // Manejar envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('whatsappName').value;
    const message = document.getElementById('whatsappMessage').value;
    
    // Crear mensaje formateado
    const formattedMessage = encodeURIComponent(`Hola, soy ${name}. ${message}`);
    
    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
    
    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappUrl, '_blank');
    
    // Resetear formulario y cerrar popup
    form.reset();
    popup.classList.remove('active');
  });
});