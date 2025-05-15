import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { OverlayProvider } from "overlay-kit";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <OverlayProvider>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </OverlayProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
