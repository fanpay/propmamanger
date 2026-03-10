export const buildWhatsAppUrl = (phone: string, template: string, vars: Record<string, string>) => {
    // TODO Fase 3: Reemplazar wa.me links por integración con
    // WhatsApp Business API (Meta) o Twilio WhatsApp API
    // para envío programático sin abrir el navegador.
    // Requiere: cuenta Meta Business verificada o cuenta Twilio.
    // El número de teléfono configurado vendrá de AppConfigContext.

    const cleanPhone = phone.replace(/\D/g, '');
    const message = template.replace(/\{(\w+)\}/g, (_, key) => vars[key] || '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
