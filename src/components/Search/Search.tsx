import { Autocomplete } from "@acid-info/lsd-react";
import styles from "./Search.module.css";

export default function Search() {
  return (
    <Autocomplete
      className={styles.searchBox}
      placeholder="Search through the LPE posts.."
      withIcon
    />
  );
}
