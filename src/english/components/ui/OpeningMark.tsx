"use client";

import { motion } from "framer-motion";
import styles from "@/english/components/ui/HomeOpening.module.css";

/* The four paths from /icons/logo.svg, assembled as outline, depth and face
   layers so the opening uses our own mark without downloading a 3D model. */
const PARTS = [
  "M69.3163 4.22714L26.3358 31.9122L17.4593 22.4738C17.9464 21.5253 18.2454 20.4686 18.2454 19.3319C18.2454 15.7017 15.293 12.748 11.6614 12.748C10.5235 12.748 9.46677 13.0457 8.51829 13.5341L0 4.50292H18.0868L29.8385 17.2649L49.7604 4.31993L69.3163 4.22843Z",
  "M51.9245 31.2217L75.4651 54.2623H56.8834L42.7555 40.1433L27.4484 54.3551L8.21202 54.2623C8.18753 54.2623 8.17078 54.2455 8.17078 54.2288V25.9574C8.17078 25.9329 8.18753 25.9162 8.21202 25.9162H15.8849C15.9094 25.9162 15.9261 25.9329 15.9261 25.9574L15.881 47.0095L79.2591 4.64367L51.9245 31.2204Z",
  "M84.1738 0.00701837L79.8476 0.541826L76.1555 0.999315C75.8346 1.03926 75.5846 1.26607 75.5163 1.58309C75.4467 1.89882 75.5473 2.27255 75.8527 2.3808L79.7549 3.75583C80.0448 3.85764 80.2342 4.11022 80.2536 4.41693L80.5075 8.54591C80.5268 8.86937 80.8593 9.06783 81.1827 9.08716C81.5049 9.10778 81.7923 8.92865 81.9186 8.63097L83.3696 5.20561L85.0694 1.19133C85.1919 0.901373 85.1545 0.592085 84.9638 0.34079C84.7743 0.0907831 84.4869 -0.0316425 84.1764 0.00701837Z",
  "M15.6761 19.3297C15.6761 19.7112 15.6181 20.0668 15.5099 20.3903C15.0794 22.0141 13.5627 23.2074 11.7984 23.2074C9.66048 23.2074 7.92848 21.4754 7.92848 19.3297C7.92848 17.5732 9.11408 16.0564 10.7456 15.617C11.069 15.5087 11.417 15.4598 11.7984 15.4598C13.9364 15.4598 15.6761 17.1918 15.6761 19.3297Z",
];

const ease = [0.22, 1, 0.36, 1] as const;
const offsets = [{ x: -8, y: -12 }, { x: 10, y: 12 }, { x: 12, y: -10 }, { x: -8, y: 0 }];
const depthLayers = 32;

export function OpeningMark({ reduced }: { reduced: boolean | null }) {
  return (
    <div className={styles.markScene} aria-hidden="true">
      <motion.div
        className={styles.floor}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 1.4, ease }}
      />
      <span className={`${styles.registration} ${styles.registrationStart}`}>[ TX / 01 ]</span>
      <span className={`${styles.registration} ${styles.registrationEnd}`}>[ + / + ]</span>
      <motion.svg
        className={styles.mark}
        viewBox="-22 -18 130 100"
        fill="none"
        initial={reduced ? false : { rotateX: 28, rotateY: -24, rotateZ: -8, y: 12 }}
        animate={{ rotateX: 8, rotateY: -8, rotateZ: 0, y: 0 }}
        transition={{ duration: reduced ? 0 : 2.25, ease }}
      >
        <motion.path
          d="M-12 0V-9H0M85-9H96V0M96 54V65H85M0 65H-12V54M-18 27H-8M99 27H109"
          stroke="currentColor"
          strokeWidth="0.35"
          className={styles.dimensions}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 0.1 }}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.65 }}
        >
          {Array.from({ length: depthLayers }, (_, index) => (
            <g key={index} transform={`translate(${(1 - index / depthLayers) * -5.5} ${(1 - index / depthLayers) * 6.5})`}>
              {PARTS.map((part, partIndex) => (
                <path key={partIndex} d={part} fill="currentColor" fillRule="evenodd" clipRule="evenodd" className={styles.markDepth} />
              ))}
            </g>
          ))}
        </motion.g>
        {PARTS.map((part, index) => (
          <motion.path
            key={`outline-${index}`}
            d={part}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.9, 0.35] }}
            transition={{ duration: reduced ? 0 : 1.5, delay: reduced ? 0 : index * 0.06 }}
          />
        ))}
        {PARTS.map((part, index) => (
          <motion.path
            key={`face-${index}`}
            d={part}
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            className={index > 1 ? styles.markAccent : styles.markFace}
            initial={reduced ? false : { opacity: 0, ...offsets[index] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.7 + index * 0.12, ease }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
