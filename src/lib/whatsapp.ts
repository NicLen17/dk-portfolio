import type { ContactFormData, CommissionFormData, ServiceOption } from "@/types";

const WA_NUMBER = "16784387649";
const SITE_URL = "dkgrfx.com";
const DIVIDER = "──────────────────";

export function buildWhatsAppURL(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildContactMessage(data: ContactFormData): string {
  const servicesStr =
    data.services.length > 0 ? data.services.join(", ") : "Not specified";

  const message = [
    "📩 Nueva consulta DKGRFX",
    DIVIDER,
    `👤 Nombre: ${data.name}`,
    `📧 Email: ${data.email}`,
    `🎯 Servicios: ${servicesStr}`,
    `📝 Detalles:`,
    data.projectDetails || "No details provided.",
    DIVIDER,
    `Enviado desde ${SITE_URL}`,
  ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildPhotoRequestMessage(
  eventName: string,
  photoId: string
): string {
  const message = [
    "📷 Solicitud de Foto — DKGRFX",
    DIVIDER,
    `📸 Evento: ${eventName}`,
    `🖼️ Foto ID: #${photoId}`,
    "💬 Quiero adquirir esta fotografía.",
    DIVIDER,
    `Enviado desde ${SITE_URL}`,
  ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildCommissionMessage(data: CommissionFormData): string {
  const message = [
    "🎨 Solicitud de Commission — DKGRFX",
    DIVIDER,
    `👤 Nombre: ${data.name}`,
    `📧 Email: ${data.email}`,
    `🎨 Tipo de arte: ${data.artworkType}`,
    `📝 Descripción:`,
    data.description || "No description provided.",
    DIVIDER,
    `Enviado desde ${SITE_URL}`,
  ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildPrintInquiryMessage(printTitle: string): string {
  const message = [
    "🖼️ Consulta de Print — DKGRFX",
    DIVIDER,
    `🎨 Obra: ${printTitle}`,
    "💬 Me interesa adquirir un print de esta obra.",
    "¿Podrías darme más información sobre tamaños y precios?",
    DIVIDER,
    `Enviado desde ${SITE_URL}`,
  ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildServiceInquiryMessage(
  service: ServiceOption | string,
  projectSlug?: string
): string {
  const projectRef = projectSlug
    ? `\n📁 Proyecto de referencia: ${projectSlug}`
    : "";

  const message = [
    "📸 Solicitud de Servicio — DKGRFX",
    DIVIDER,
    `🎯 Servicio: ${service}${projectRef}`,
    "💬 Me interesa contratar este servicio. ¿Podemos hablar?",
    DIVIDER,
    `Enviado desde ${SITE_URL}`,
  ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildBookingMessage(serviceType: string): string {
  const message = [
    "📸 Solicitud de Booking — DKGRFX",
    DIVIDER,
    `🎯 Servicio: ${serviceType}`,
    "💬 Quiero agendar una sesión/cobertura fotográfica.",
    "¿Cuáles son tus disponibilidades?",
    DIVIDER,
    `Enviado desde ${SITE_URL}`,
  ].join("\n");

  return buildWhatsAppURL(message);
}

export function buildGeneralWhatsAppURL(): string {
  const message = [
    "👋 Hola DKGRFX!",
    "Me interesa conocer más sobre tus servicios.",
    DIVIDER,
    `Enviado desde ${SITE_URL}`,
  ].join("\n");

  return buildWhatsAppURL(message);
}
