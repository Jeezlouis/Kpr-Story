import { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);

export default function ScrambleTest() {
  const el = useRef();

  const handleHover = () => {
    gsap.to(el.current, {
      duration: 2,
      text: {
        value: "SCRAMBLED TEXT",
        scrambleText: {
          characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          speed: 1,
          revealDelay: 0.2,
        },
      },
      ease: "none",
    });
  };

  return (
    <div className="text-white relative text-2xl p-10 bg-black min-h-screen flex items-center justify-center">
      <a
        ref={el}
        onMouseEnter={() => {
            console.log("Mouse entered");
        }}
        className="cursor-pointer pointer-events-auto"
      >
        Hover me
      </a>
    </div>
  );
}
