import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import { Autocomplete } from "@acid-info/lsd-react";

export default function HeaderLayout() {
  return (
    <>
      <Navbar isDark={false} />
      <Header />
      <Autocomplete style={{ width: "100%" }} withIcon />
    </>
  );
}
