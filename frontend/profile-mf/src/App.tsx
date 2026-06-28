import { BrowserRouter } from "react-router-dom";

import ProfileRoutes from "./routes/ProfileRoutes";

function App() {
  return (
    <BrowserRouter>
      <ProfileRoutes />
    </BrowserRouter>
  );
}

export default App;