import styles from "./ClientItem.module.css";
import type { Client } from "../../types/Client";

function ClientItem(props: Readonly<{ client: Client }>) {
  const { url, name, description, image, color, logo } = props.client;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      class={styles.portfolioItem}
    >
      {/* Image layer - hidden by default, slides in on hover */}
      <div class={styles.portfolioItemImage}>
        <img src={image} alt={name} loading="lazy" />
      </div>

      {/* Content layer - always visible with color background */}
      <div
        class={styles.portfolioItemContent}
        style={{ "background-color": color }}
      >
        <div class={styles.logoPlaceholder}>{logo}</div>
        <h3 class={styles.portfolioItemTitle}>{name}</h3>
        <p class={styles.portfolioItemDescription}>{description}</p>
      </div>
    </a>
  );
}

export default ClientItem;
