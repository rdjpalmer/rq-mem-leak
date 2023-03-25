import "./styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Component from "./Component";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Component />
      </div>
    </QueryClientProvider>
  );
}
