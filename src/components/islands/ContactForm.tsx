import { createSignal, Show } from "solid-js";
import styles from "./ContactForm.module.css";
import codeGuy from "../../assets/img/common/code_guy.svg";

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

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div class={styles.wrapper}>
      <div class="hero-media">
        <img src={codeGuy.src} alt="Code Guy" />
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
            ></textarea>
          </div>

          <button type="submit" class={styles.button} disabled={loading()}>
            {loading() ? "..." : props.labels.submit}
          </button>
        </form>
      </Show>
    </div>
  );
}
