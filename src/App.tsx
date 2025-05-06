import { ManagerButtons } from "@/components/manager-buttons";
import { Map } from "@/components/map";
import { ShowPointsList } from "@/components/show-points-list";
import { Heading } from "@/components/title";
import { ShowAlert } from "./components/show-alert";

export function App() {
  return (
    <main className="flex h-dvh flex-col">
      <Heading>
        <Heading.Title title="Gestão de pontos no mapa" />
      </Heading>
      <ShowAlert />
      <div className="relative flex-1">
        <ShowPointsList />
        <Map />
        <ManagerButtons />
      </div>
    </main>
  );
}
