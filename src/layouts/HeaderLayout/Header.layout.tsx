import { Header } from "@/components/Header";
import { HeaderTags } from "@/components/HeaderTags";
import { Navbar } from "@/components/Navbar";
import { Search } from "@/components/Search";
import useIsDarkState from "@/states/isDarkState/isDarkState";

export default function HeaderLayout() {
  const isDarkState = useIsDarkState();
  return (
    <>
      <Navbar isDark={isDarkState.get()} toggle={isDarkState.toggle} />
      <Header />
      <HeaderTags />
      <Search />
    </>
  );
}
