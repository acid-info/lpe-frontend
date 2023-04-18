import { Header } from "@/components/Header";
import { HeaderTags } from "@/components/HeaderTags";
import { Navbar } from "@/components/Navbar";
import useIsDarkState from "@/states/isDarkState/isDarkState";
import { Autocomplete } from "@acid-info/lsd-react";

export default function HeaderLayout() {
  const isDarkState = useIsDarkState();
  return (
    <>
      <Navbar isDark={isDarkState.get()} toggle={isDarkState.toggle} />
      <Header />
      <HeaderTags />
      <Autocomplete
        placeholder="Search through the LPE posts.."
        style={{ width: "100%" }}
        withIcon
      />
    </>
  );
}
