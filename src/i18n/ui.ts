export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "es";

export const ui = {
  es: {
    "nav.home": "Inicio",
    "nav.about": "Nosotros",
    "nav.services": "Servicios",
    "nav.contact": "Contacto",
    "nav.try": "Hablemos",
    "hero.title": "Soluciones digitales que encajan.",
    "hero.subtitle":
      "Desarrollamos sitios web, posicionamiento SEO y aplicaciones móviles para pequeñas y medianas empresas.",
    "hero.cta": "Comienza ahora",
    "catchup.title": "¿Tu negocio es invisible en internet?",
    "catchup.text":
      "¿Sientes que tus clientes no te encuentran? ¿Quieres programar una asesoría gratis con nosotros? Descubre cómo podemos potenciar tu presencia digital.",
    "catchup.cta": "Agenda tu asesoría gratis",
    "about.title": "Sobre Click & Fix",
    "about.text":
      "Somos una startup apasionada por transformar ideas en realidad digital. Nuestro enfoque es simple: crear tecnología accesible y efectiva que impulse el crecimiento de tu negocio.",
    "services.title": "Lo que hacemos",
    "services.web.title": "Desarrollo Web",
    "services.web.desc": "Sitios modernos, rápidos y optimizados.",
    "services.web.longDesc":
      "Desarrollamos sitios web a medida que no solo se ven bien, sino que están optimizados para velocidad y conversión. Utilizamos las últimas tecnologías para garantizar que tu presencia en línea sea sólida y escalable.",
    "services.seo.title": "Posicionamiento SEO",
    "services.seo.desc":
      "Mejora tu visibilidad en buscadores y atrae más clientes.",
    "services.seo.longDesc":
      "Nuestras estrategias de SEO están diseñadas para aumentar tu tráfico orgánico y mejorar tu ranking en Google. Desde auditorías técnicas hasta creación de contenido, nos encargamos de que te encuentren.",
    "services.app.title": "Apps Móviles",
    "services.app.desc": "Aplicaciones nativas para iOS y Android.",
    "services.app.longDesc":
      "Transforma tu negocio con una aplicación móvil intuitiva y potente. Desarrollamos soluciones nativas y multiplataforma que ofrecen una experiencia de usuario excepcional en cualquier dispositivo.",
    "clients.title": "Nuestros Clientes",
    "contact.title": "Hablemos",
    "contact.catchphrase":
      "Ofrecemos una consulta gratuita para nuevos clientes. Descubre cómo podemos ayudarte.",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.message": "Mensaje",
    "contact.submit": "Enviar Mensaje",
    "contact.messageSent.title": "Mensaje enviado",
    "contact.messageSent.description":
      "A la brevedad nos pondremos en contacto contigo. :)",
    "footer.copyright": "Click & Fix. Todos los derechos reservados.",
    "seo.title": "Click & Fix | Soluciones Digitales",
    "seo.description":
      "Desarrollo web, SEO y aplicaciones móviles para potenciar tu negocio.",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.try": "Let's talk",
    "hero.title": "Digital solutions that just click.",
    "hero.subtitle":
      "We build websites, SEO strategies, and mobile apps for small and medium businesses.",
    "hero.cta": "Start now",
    "catchup.title": "Is your business invisible online?",
    "catchup.text":
      "Do you feel like customers can't find you? Want to schedule a free consultation with us? Discover how we can boost your digital presence.",
    "catchup.cta": "Schedule free consultation",
    "about.title": "About Click & Fix",
    "about.text":
      "We are a startup passionate about transforming ideas into digital reality. Our focus is simple: create accessible and effective technology that drives your business growth.",
    "services.title": "What we do",
    "services.web.title": "Web Development",
    "services.web.desc": "Modern, fast, and optimized websites.",
    "services.web.longDesc":
      "We develop custom websites that not only look good but are optimized for speed and conversion. We use the latest technologies to ensure your online presence is solid and scalable.",
    "services.seo.title": "SEO Positioning",
    "services.seo.desc":
      "Improve your search visibility and attract more customers.",
    "services.seo.longDesc":
      "Our SEO strategies are designed to increase your organic traffic and improve your ranking on Google. From technical audits to content creation, we ensure you get found.",
    "services.app.title": "Mobile Apps",
    "services.app.desc": "Native applications for iOS and Android.",
    "services.app.longDesc":
      "Transform your business with an intuitive and powerful mobile app. We develop native and cross-platform solutions that offer an exceptional user experience on any device.",
    "clients.title": "Our Clients",
    "contact.title": "Let's Talk",
    "contact.catchphrase":
      "We offer a free consultation for new clients. Let's discuss how we can help you grow.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.submit": "Send Message",
    "contact.messageSent.title": "Message Sent!",
    "contact.messageSent.description": "We'll get back to you soon.",
    "footer.copyright": "Click & Fix. All rights reserved.",
    "seo.title": "Click & Fix | Digital Solutions",
    "seo.description":
      "Web development, SEO, and mobile apps to boost your business.",
  },
} as const;

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
