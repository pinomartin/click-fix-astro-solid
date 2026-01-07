import { createSignal, onMount, onCleanup, For } from "solid-js";
import styles from "./ClientsCarousel.module.css";
import ClientItem from "./ClientItem";
import type { Client } from "../../types/Client";

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
