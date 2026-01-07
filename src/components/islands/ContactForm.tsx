import { createSignal, Show } from "solid-js";
import styles from "./ContactForm.module.css";
import codeGuy from "../../assets/img/common/code_guy.svg";
import { WHATSAPP_NUMBER } from "../../constants/contact";

type ContactFormProps = {
  labels: {
    title: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    messageSentTitle: string;
    messageSentDescription: string;
  };
};

export default function ContactForm(props: Readonly<ContactFormProps>) {
  const [loading, setLoading] = createSignal(false);
  const [success, setSuccess] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Extraer datos del formulario
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      // 1. Enviar a Web3Forms (Email)
      const emailResponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.WEB3_MAILING,
          name,
          email,
          message,
          subject: `Nuevo mensaje de ${name} - Click&Fix`,
          from_name: "Click&Fix Contact Form",
          redirect: "false",
        }),
      });

      const emailResult = await emailResponse.json();

      if (!emailResult.success) {
        throw new Error("Error al enviar el email");
      }

      // 2. Abrir WhatsApp en nueva pestaña
      const whatsappMessage = `Hola! 👋\n\nSoy *${name}*\n\nEmail: ${email}\n\nMensaje: ${message}`;
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER.replaceAll(
        /[D+]/g,
        ""
      )}?text=${encodeURIComponent(whatsappMessage)}`;

      setTimeout(() => {
        window.open(whatsappURL, "_blank");
      }, 500);

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 5000);
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Hubo un error al enviar el mensaje. Por favor intenta nuevamente."
      );
      setLoading(false);
    }
  };

  return (
    <div class={styles.wrapper}>
      <div class="hero-media">
        <img src={codeGuy.src} alt="Code Guy" loading="lazy" />
      </div>
      <Show when={props.labels.title}>
        <h2 class={styles.title}>{props.labels.title}</h2>
      </Show>

      <Show
        when={!success()}
        fallback={
          <div class={styles.success}>
            <div class={styles.checkIcon}>✓</div>
            <h3>{props.labels.messageSentTitle}</h3>
            <p>{props.labels.messageSentDescription}</p>
          </div>
        }
      >
        <form onSubmit={handleSubmit} class={styles.form}>
          <div class={styles.field}>
            <label for="name" class={styles.label}>
              {props.labels.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              class={styles.input}
              placeholder="Juan Pérez"
            />
          </div>

          <div class={styles.field}>
            <label for="email" class={styles.label}>
              {props.labels.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class={styles.input}
              placeholder="juan@example.com"
            />
          </div>

          <div class={styles.field}>
            <label for="message" class={styles.label}>
              {props.labels.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              class={styles.textarea}
              placeholder="Cuéntanos sobre tu proyecto..."
            ></textarea>
          </div>

          <Show when={error()}>
            <div class={styles.error}>{error()}</div>
          </Show>

          <button type="submit" class={styles.button} disabled={loading()}>
            {loading() ? "Enviando..." : props.labels.submit}
          </button>
        </form>
      </Show>
    </div>
  );
}
