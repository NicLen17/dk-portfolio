import type { ContactFormData, CommissionFormData, ServiceOption } from "@/types";

const WA_NUMBER = "16784387649";
const SITE_URL = "dkgrfx.com";
const DIVIDER = "──────────────────";

export function buildWhatsAppURL(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildContactMessage(data: ContactFormData, lang: string = "EN"): string {
  const isEs = lang.toUpperCase() === "ES";
  const servicesStr = data.services.length > 0 
    ? data.services.join(", ") 
    : (isEs ? "No especificado" : "Not specified");

  const message = isEs
    ? [
        "📩 Nueva consulta — DKGRFX",
        DIVIDER,
        `👤 Nombre: ${data.name}`,
        `📧 Email: ${data.email}`,
        `🎯 Servicios: ${servicesStr}`,
        `📝 Detalles:`,
        data.projectDetails || "Sin detalles proporcionados.",
        DIVIDER,
        `Enviado desde ${SITE_URL}`,
      ].join("\n")
    : [
        "📩 New inquiry — DKGRFX",
        DIVIDER,
        `👤 Name: ${data.name}`,
        `📧 Email: ${data.email}`,
        `🎯 Services: ${servicesStr}`,
        `📝 Details:`,
        data.projectDetails || "No details provided.",
        DIVIDER,
        `Sent from ${SITE_URL}`,
      ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildPhotoRequestMessage(
  eventName: string,
  photoId: string,
  lang: string = "EN"
): string {
  const isEs = lang.toUpperCase() === "ES";
  const message = isEs
    ? [
        "📷 Solicitud de Foto — DKGRFX",
        DIVIDER,
        `📸 Evento: ${eventName}`,
        `🖼️ Foto ID: #${photoId}`,
        "💬 Quiero adquirir esta fotografía.",
        DIVIDER,
        `Enviado desde ${SITE_URL}`,
      ].join("\n")
    : [
        "📷 Photo Request — DKGRFX",
        DIVIDER,
        `📸 Event: ${eventName}`,
        `🖼️ Photo ID: #${photoId}`,
        "💬 I would like to acquire this photograph.",
        DIVIDER,
        `Sent from ${SITE_URL}`,
      ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildCommissionMessage(data: CommissionFormData, lang: string = "EN"): string {
  const isEs = lang.toUpperCase() === "ES";
  const message = isEs
    ? [
        "🎨 Solicitud de Encargo — DKGRFX",
        DIVIDER,
        `👤 Nombre: ${data.name}`,
        `📧 Email: ${data.email}`,
        `🎨 Tipo de arte: ${data.artworkType}`,
        `📝 Descripción:`,
        data.description || "Sin descripción proporcionada.",
        DIVIDER,
        `Enviado desde ${SITE_URL}`,
      ].join("\n")
    : [
        "🎨 Art Commission Request — DKGRFX",
        DIVIDER,
        `👤 Name: ${data.name}`,
        `📧 Email: ${data.email}`,
        `🎨 Artwork Type: ${data.artworkType}`,
        `📝 Description:`,
        data.description || "No description provided.",
        DIVIDER,
        `Sent from ${SITE_URL}`,
      ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildPrintInquiryMessage(printTitle: string, lang: string = "EN"): string {
  const isEs = lang.toUpperCase() === "ES";
  const message = isEs
    ? [
        "🖼️ Consulta de Print — DKGRFX",
        DIVIDER,
        `🎨 Obra: ${printTitle}`,
        "💬 Me interesa adquirir un print de esta obra.",
        "¿Podrías darme más información sobre tamaños y precios?",
        DIVIDER,
        `Enviado desde ${SITE_URL}`,
      ].join("\n")
    : [
        "🖼️ Art Print Inquiry — DKGRFX",
        DIVIDER,
        `🎨 Artwork: ${printTitle}`,
        "💬 I am interested in purchasing an art print of this piece.",
        "Could you provide more information about available sizes and pricing?",
        DIVIDER,
        `Sent from ${SITE_URL}`,
      ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildServiceInquiryMessage(
  service: ServiceOption | string,
  projectSlug?: string,
  lang: string = "EN"
): string {
  const isEs = lang.toUpperCase() === "ES";
  const projectRef = projectSlug
    ? (isEs ? `\n📁 Proyecto de referencia: ${projectSlug}` : `\n📁 Reference project: ${projectSlug}`)
    : "";

  const message = isEs
    ? [
        "📸 Solicitud de Servicio — DKGRFX",
        DIVIDER,
        `🎯 Servicio: ${service}${projectRef}`,
        "💬 Me interesa contratar este servicio. ¿Podemos hablar?",
        DIVIDER,
        `Enviado desde ${SITE_URL}`,
      ].join("\n")
    : [
        "📸 Service Request — DKGRFX",
        DIVIDER,
        `🎯 Service: ${service}${projectRef}`,
        "💬 I am interested in hiring this service. Can we talk?",
        DIVIDER,
        `Sent from ${SITE_URL}`,
      ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildBookingMessage(serviceType: string, lang: string = "EN"): string {
  const isEs = lang.toUpperCase() === "ES";
  const message = isEs
    ? [
        "📸 Solicitud de Booking — DKGRFX",
        DIVIDER,
        `🎯 Servicio: ${serviceType}`,
        "💬 Quiero agendar una sesión/cobertura fotográfica.",
        "¿Cuáles son tus disponibilidades?",
        DIVIDER,
        `Enviado desde ${SITE_URL}`,
      ].join("\n")
    : [
        "📸 Booking Inquiry — DKGRFX",
        DIVIDER,
        `🎯 Service: ${serviceType}`,
        "💬 I want to book a photography session/event coverage.",
        "What is your current availability?",
        DIVIDER,
        `Sent from ${SITE_URL}`,
      ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildGeneralWhatsAppURL(lang: string = "EN"): string {
  const isEs = lang.toUpperCase() === "ES";
  const message = isEs
    ? [
        "👋 ¡Hola DKGRFX!",
        "Me interesa conocer más sobre tus servicios.",
        DIVIDER,
        `Enviado desde ${SITE_URL}`,
      ].join("\n")
    : [
        "👋 Hi DKGRFX!",
        "I would like to learn more about your services.",
        DIVIDER,
        `Sent from ${SITE_URL}`,
      ].join("\n");

  return buildWhatsAppURL(message);
}
