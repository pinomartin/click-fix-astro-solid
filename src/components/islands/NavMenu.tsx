import { createSignal, Show, For } from "solid-js";
import styles from "./NavMenu.module.css";

type Link = {
  href: string;
  label: string;
};

interface NavMenuProps {
  links: Link[];
}

export default function NavMenu(props: Readonly<NavMenuProps>) {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div class={styles.wrapper}>
      <button
        class={styles.menuBtn}
        onClick={() => setIsOpen(!isOpen())}
        aria-label="Menu"
        aria-expanded={isOpen()}
      >
        <div class={styles.hamburger}>
          <span class={`${styles.line} ${isOpen() ? styles.open : ""}`}></span>
          <span class={`${styles.line} ${isOpen() ? styles.open : ""}`}></span>
        </div>
      </button>

      <Show when={isOpen()}>
        <div class={styles.dropdown}>
          <nav class={styles.nav}>
            <ul class={styles.list}>
              <For each={props.links}>
                {(link) => (
                  <li>
                    <a
                      href={link.href}
                      class={styles.link}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </nav>
        </div>
      </Show>
    </div>
  );
}
