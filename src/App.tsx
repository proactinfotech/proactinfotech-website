import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SideNav } from "@/components/layout/SideNav";
import { Footer } from "@/components/layout/Footer";
import { PageNavigator } from "@/components/layout/PageNavigator";
import { LogoPill, MobileLogoPill } from "@/components/layout/LogoPill";
import { BackgroundParticles } from "@/components/layout/BackgroundParticles";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { HeroBorderFrame } from "@/components/layout/HeroBorderFrame";
import { PageTransitionProvider } from "@/components/layout/PageTransition";
import { HeroSphere } from "@/components/three/HeroSphere";
import { Analytics } from "@vercel/analytics/react";

function RouteScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/** Renders the 3-D sphere only on pages where it makes visual sense */
function ConditionalHeroSphere() {
  const { pathname } = useLocation();
  const hidden = ["/contact"];
  if (hidden.includes(pathname)) return null;
  return <HeroSphere />;
}
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Culture = lazy(() => import("./pages/Culture"));
const Careers = lazy(() => import("./pages/Careers"));
const Investors = lazy(() => import("./pages/Investors"));
const BusinessDetail = lazy(() => import("./pages/BusinessDetail"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTransitionProvider>
          <RouteScrollReset />
          <HeroBorderFrame />
          <BackgroundParticles />
          <LogoPill />
          <MobileLogoPill />
          <SideNav />
          <main className="relative z-10">
            <ConditionalHeroSphere />
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/culture" element={<Culture />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/businesses/:slug" element={<BusinessDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ScrollToTop />
          <PageNavigator />
        </PageTransitionProvider>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
