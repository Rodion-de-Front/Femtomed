import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import About from "@/pages/About";
import CLEAR from "@/pages/CLEAR";
import AQUARIUZ from "@/pages/AQUARIUZ";
import FLOWSUITE from "@/pages/FLOWSUITE";
import Products from "@/pages/Products";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import ProductDetail from "@/pages/ProductDetail";
import VisionTest from "@/pages/VisionTest";
import Contacts from "@/pages/Contacts";
import Cataract from "@/pages/Cataract";
import Refraction from "@/pages/Refraction";
import CornealGrafting from "@/pages/CornealGrafting";
import Keratikonus from "@/pages/Keratikonus";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/clear" component={CLEAR} />
        <Route path="/aquariuz" component={AQUARIUZ} />
        <Route path="/flow-suite" component={FLOWSUITE} />
        <Route path="/products" component={Products} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogDetail} />
        <Route path="/vision-test" component={VisionTest} />
        <Route path="/cataract" component={Cataract} />
        <Route path="/refraction" component={Refraction} />
        <Route path="/corneal-grafting" component={CornealGrafting} />
        <Route path="/keratikonus" component={Keratikonus} />
        <Route path="/clients" component={Contacts} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
