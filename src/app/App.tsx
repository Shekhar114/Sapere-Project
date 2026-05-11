import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import OurPillars from "./OurPillars";
import PillarCard from "./PillarCard";
import SapereArticlesPage from "./SapereArticlesPage"; 
import SapereArticle from "./SapereArticle";
import BlogList from "./BlogList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/pillars" element={<OurPillars />} />
        <Route path="pillarsCard" element={<PillarCard />} />

        {/* <Route path="/articles" element={<SapereArticlesPage />} /> 
        <Route path="/article" element={<SapereArticle />} /> 
        <Route path="/blogs" element={<BlogList />} /> */}
      </Routes>
    </BrowserRouter>
  );
}