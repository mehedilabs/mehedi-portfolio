import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Skills from "./pages/Skills";
import Thinking from "./pages/Thinking";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/projects" element={<Projects />} />

      <Route
        path="/projects/:slug"
        element={<ProjectDetails />}
      />

      <Route path="/skills" element={<Skills />} />

      <Route path="/thinking" element={<Thinking />} />

      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default App;