import { createSignal, onMount, onCleanup, For } from "solid-js";
import styles from "./ClientsCarousel.module.css";
import ClientItem from "./ClientItem";

type Client = {
  name: string;
  url: string;
  color: string;
  logo: string;
  image: string;
  description: string;
  key: string;
};

type ClientsCarouselProps = {
  clients: Client[];
};

export default function ClientsCarousel(props: Readonly<ClientsCarouselProps>) {
  let scrollContainer: HTMLDivElement | undefined;
  const [canScrollLeft, setCanScrollLeft] = createSignal(false);
  const [canScrollRight, setCanScrollRight] = createSignal(true);

  const checkScroll = () => {
    if (!scrollContainer) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding
  };

  onMount(() => {
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
      checkScroll();
      // Initial check after layout
      setTimeout(checkScroll, 100);
    }
    window.addEventListener("resize", checkScroll);
  });

  onCleanup(() => {
    if (scrollContainer) {
      scrollContainer.removeEventListener("scroll", checkScroll);
    }
    if (globalThis.window) {
      window.removeEventListener("resize", checkScroll);
    }
  });

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainer) return;
    const scrollAmount = scrollContainer.clientWidth * 0.8;
    scrollContainer.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div class={styles.carouselWrapper}>
      <div class={styles.controls}>
        <button
          class={styles.navButton}
          disabled={!canScrollLeft()}
          onClick={() => scroll("left")}
          aria-label="Previous clients"
        >
          ←
        </button>
        <button
          class={styles.navButton}
          disabled={!canScrollRight()}
          onClick={() => scroll("right")}
          aria-label="Next clients"
        >
          →
        </button>
      </div>

      <div class={styles.track} ref={scrollContainer}>
        <For each={props.clients}>
          {(client) => <ClientItem client={client} />}
        </For>
      </div>
    </div>
  );
}

{
  /* <a
  href={client.url}
  target="_blank"
  rel="noopener noreferrer"
  class={styles.card}
  style={{ "background-color": client.color }}
>
  <div class={styles.content}>
    <div class={styles.logoPlaceholder}>{client.logo}</div>
    <h3 class={styles.name}>{client.name}</h3>
  </div>
</a> */
}
