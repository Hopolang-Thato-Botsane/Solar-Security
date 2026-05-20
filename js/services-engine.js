export function initServicesEngine() {
  const serviceCards = document.querySelectorAll('.services-section .card');
  
  if (serviceCards.length === 0) return;

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}