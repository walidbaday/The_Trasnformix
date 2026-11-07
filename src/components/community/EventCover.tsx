import type { CommunityEvent } from "@/lib/communityNews";
import styles from "./EventCover.module.css";

/** The navy editorial cover an event's card and page share (Figma 4416:4905):
    a faint grid, the TX Community mark, the headline and its theme. It sizes
    its type to its own width, so it reads the same on a card and full width. */
export function EventCover({ cover, size }: { cover: CommunityEvent["cover"]; size: "card" | "page" }) {
  return (
    <div className={`${styles.cover} ${size === "card" ? styles.card : styles.page}`} aria-hidden="true">
      <div className={styles.inner}>
        <p className={styles.identity} lang="en">
          TX COMMUNITY
        </p>
        <div className={styles.headline}>
          <p className={styles.edition} lang="en">
            {cover.headline}
          </p>
          <p className={styles.theme}>{cover.theme}</p>
          <p className={styles.topics} lang="en">
            {cover.topics}
          </p>
        </div>
        <div className={styles.footer}>
          <p className={styles.tally}>{cover.tally}</p>
          {size === "page" && (
            <p className={styles.location} lang="en">
              {cover.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
