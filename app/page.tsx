import { RocketList } from "./components/RocketList";

export default function Home() {
  return (
    <main>
      <RocketList
        filterParams={{
          year: 2018,
          customerName: "NASA",
        }}
      />
    </main>
  );
}
