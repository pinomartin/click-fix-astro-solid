// @ts-ignore
import SimpleParallax from "simple-parallax-js/vanilla";
import { onMount, onCleanup } from "solid-js";

interface ParallaxProps {
  src: string;
  alt: string;
  className?: string;
  orientation?:
    | "up"
    | "right"
    | "down"
    | "left"
    | "up left"
    | "up right"
    | "down left"
    | "down right";
  scale?: number;
  overflow?: boolean;
  delay?: number;
  transition?: string;
  maxTransition?: number;
}

export default function Parallax(props: Readonly<ParallaxProps>) {
  let imgRef: HTMLImageElement | undefined;
  let instance: any;

  onMount(() => {
    if (imgRef) {
      instance = new SimpleParallax(imgRef, {
        orientation: props.orientation || "up",
        scale: props.scale || 1.3,
        overflow: props.overflow || false,
        delay: props.delay || 0,
        transition: props.transition || "",
        maxTransition: props.maxTransition || 0,
      });
    }
  });

  onCleanup(() => {
    if (instance) {
      instance.destroy();
    }
  });

  return (
    <img
      ref={imgRef}
      src={props.src}
      alt={props.alt}
      class={props.className}
      loading="lazy"
      decoding="async"
    />
  );
}
