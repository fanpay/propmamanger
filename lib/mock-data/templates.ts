export interface MessageTemplate {
    id: string;
    code: string;
    name: string;
    type: 'ARRENDATARIO' | 'PROPIETARIO' | 'CLIENTE' | 'GENERAL';
    channels: ('WHATSAPP' | 'EMAIL')[];
    content: string;
    updatedAt: Date;
}

export const mockTemplates: MessageTemplate[] = [
    {
        id: 'tpl-1',
        code: 'MSG_ARRENDATARIO_BIENVENIDA',
        name: 'Bienvenida al arrendatario',
        type: 'ARRENDATARIO',
        channels: ['WHATSAPP', 'EMAIL'],
        content: '¡Hola {nombre_cliente}! Bienvenido a tu nuevo hogar en {nombre_propiedad}. Soy {nombre_asesor}, tu asesor en PropManager. Recuerda que la fecha límite de pago es el día {fecha} de cada mes. Si tienes dudas, contáctame al {telefono_asesor}.',
        updatedAt: new Date('2025-01-10T10:00:00Z'),
    },
    {
        id: 'tpl-2',
        code: 'MSG_PROPIETARIO_INFORME',
        name: 'Informe mensual al propietario',
        type: 'PROPIETARIO',
        channels: ['EMAIL'],
        content: 'Estimado(a) {nombre_cliente}, adjunto enviamos el informe de gestión de su propiedad {nombre_propiedad} correspondiente al mes en curso. Atentamente, {firma_asesor}',
        updatedAt: new Date('2025-02-15T14:30:00Z'),
    },
    {
        id: 'tpl-3',
        code: 'MSG_CAPTACION_PROPIEDAD',
        name: 'Captación de nueva propiedad',
        type: 'GENERAL',
        channels: ['WHATSAPP', 'EMAIL'],
        content: 'Estimado/a {nombre_cliente}, me comunico desde PropManager Medellín, somos una inmobiliaria con más de 10 años en el mercado. Nos interesa publicar y gestionar su propiedad. Nuestros honorarios corresponden al {comision}% sobre el valor de la transacción. ¿Le interesaría conversar? Atentamente,\n\n{firma_asesor}',
        updatedAt: new Date('2025-03-01T09:15:00Z'),
    },
    {
        id: 'tpl-4',
        code: 'MSG_CITA_CONFIRMACION',
        name: 'Confirmación de cita de visita',
        type: 'CLIENTE',
        channels: ['WHATSAPP'],
        content: 'Hola {nombre_cliente}. Te confirmo nuestra visita para ver la propiedad {nombre_propiedad} el día {fecha}. Mi teléfono es {telefono_asesor} por si necesitas indicaciones. ¡Nos vemos!',
        updatedAt: new Date('2024-11-20T11:00:00Z'),
    },
    {
        id: 'tpl-5',
        code: 'MSG_ITINERARIO',
        name: 'Envío de itinerario de visitas',
        type: 'CLIENTE',
        channels: ['WHATSAPP'],
        content: '¡Hola {nombre_cliente}! Te comparto el enlace con el itinerario de propiedades que visitaremos el día {fecha}. Guárdalo para tener las direcciones a mano. Nos vemos pronto.\n\n{firma_asesor}',
        updatedAt: new Date('2025-03-10T16:45:00Z'),
    }
];
