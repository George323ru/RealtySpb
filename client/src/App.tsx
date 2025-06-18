import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Buy from "@/pages/buy";
import Sell from "@/pages/sell";
import Rent from "@/pages/rent";
import NewBuildings from "@/pages/new-buildings";
import Secondary from "@/pages/secondary";
import PropertyDetail from "@/pages/property-detail";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import About from "@/pages/about";
import Team from "@/pages/team";
import Reviews from "@/pages/reviews";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Contacts from "@/pages/contacts";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/buy" component={Buy} />
      <Route path="/sell" component={Sell} />
      <Route path="/rent" component={Rent} />
      <Route path="/new-buildings" component={NewBuildings} />
      <Route path="/secondary" component={Secondary} />
      <Route path="/property/:id" component={PropertyDetail} />
      <Route path="/services" component={Services} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/about" component={About} />
      <Route path="/team" component={Team} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contacts" component={Contacts} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-neutral-50">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <FloatingCTA />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
