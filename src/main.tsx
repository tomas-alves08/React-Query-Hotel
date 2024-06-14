import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFalback from "./ui/ErrorFallback";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFalback}
        onReset={() => window.location.replace("/")}
      >
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ErrorBoundary
//       FallbackComponent={ErrorFalback}
//       onReset={() => window.location.replace("/")}
//     >
//       <App />
//     </ErrorBoundary>
//   </React.StrictMode>
// );
