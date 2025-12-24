import { AppRouter } from "@/app/routes/AppRouter";
import { ModalProvider } from "@/app/providers/ModalProvider";

function App() {
  return (
    <>
      <AppRouter />
      <ModalProvider />
    </>
  );
}

export default App;
