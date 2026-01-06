import type { DotLottie } from "@lottiefiles/dotlottie-web";
import { onMount, onCleanup, createSignal } from "solid-js";

interface Props {
  src: string;
  class?: string;
  style?: string;
  width?: string;
  height?: string;
}

export default function LottieRender(props: Readonly<Props>) {
  let canvasRef: HTMLCanvasElement | undefined;
  const [dotLottie, setDotLottie] = createSignal<DotLottie | undefined>(
    undefined
  );

  onMount(async () => {
    if (canvasRef) {
      // Lazy load DotLottie library only when component mounts
      const { DotLottie } = await import("@lottiefiles/dotlottie-web");

      const instance = new DotLottie({
        autoplay: true,
        loop: true,
        canvas: canvasRef,
        src: props.src,
        layout: {
          fit: "contain",
        },
        backgroundColor: "transparent",
      });

      setDotLottie(instance);
    }
  });

  onCleanup(() => {
    const instance = dotLottie();
    if (instance) {
      instance.destroy();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      class={props.class}
      width={props.width || "400rem"}
      height={props.height || "400rem"}
      style={` width: 100%; height: 100%; ${props.style}`}
    />
  );
}
