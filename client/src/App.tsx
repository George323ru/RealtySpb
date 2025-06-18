import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/floating-cta";
import CartProvider from "@/components/CartProvider";
import Home from "@/pages/Home";
import Buy from "@/pages/Buy";
import Sell from "@/pages/Sell";
import Rent from "@/pages/Rent";
import NewBuildings from "@/pages/NewBuildings";
import Secondary from "@/pages/Secondary";
import PropertyDetail from "@/pages/PropertyDetail";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import About from "@/pages/About";
import Reviews from "@/pages/Reviews";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contacts from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import Cart from "@/pages/cart";
import RealtorConstructor from "@/pages/realtor-constructor";
import Land from "@/pages/land";

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
      <Route path="/services/:id" component={ServiceDetail} />
      <Route path="/land" component={Land} />
      <Route path="/about" component={About} />
      <Route path="/team" component={RealtorConstructor} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/cart" component={Cart} />
      <Route path="/realtor-constructor" component={RealtorConstructor} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-neutral-50">
            <Header />
            <main>
              <Router />
            </main>
            <Footer />
            <FloatingCTA />
            <Toaster />
          </div>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
