import { Switch, Route, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingCTA from "@/components/FloatingCTA";
import CartProvider from "@/components/CartProvider";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/home";
import Buy from "@/pages/buy";
import Sell from "@/pages/sell";
import Rent from "@/pages/rent";
import NewBuildings from "@/pages/new-buildings";
import NewBuildingDetail from "@/pages/new-building-detail";
import Secondary from "@/pages/secondary";
import PropertyDetail from "@/pages/property-detail";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import About from "@/pages/about";
import Reviews from "@/pages/reviews";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Contacts from "@/pages/contacts";
import NotFound from "@/pages/not-found";
import Cart from "@/pages/cart";
import RealtorConstructor from "@/pages/realtor-constructor";
import Land from "@/pages/land";
import Calculator from "@/pages/calculator";
import ServiceLanding from "@/pages/services/service-landing";
import PreSalePreparation from "@/pages/services/PreSalePreparation";
import PrivacyPolicy from "@/pages/privacy-policy";
import AdminPage from "@/pages/admin";

// Упрощенная анимация страниц
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={pageTransition.transition}
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/buy" component={Buy} />
          <Route path="/sell" component={Sell} />
          <Route path="/rent" component={Rent} />
          <Route path="/new-buildings" component={NewBuildings} />
          <Route path="/new-buildings/:id" component={NewBuildingDetail} />
          <Route path="/secondary" component={Secondary} />
          <Route path="/property/:id" component={PropertyDetail} />
          <Route path="/services" component={Services} />
          <Route path="/services/pre-sale-preparation" component={PreSalePreparation} />
          <Route path="/services/:id" component={ServiceDetail} />
          <Route path="/services/:slug" component={ServiceLanding} />
          <Route path="/land" component={Land} />
          <Route path="/about" component={About} />
          <Route path="/team" component={RealtorConstructor} />
          <Route path="/realtor-constructor" component={RealtorConstructor} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/cart" component={Cart} />
          <Route path="/favorites" component={Cart} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/admin" component={AdminPage} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-neutral-50">
            <ScrollToTop />
            <Header />
            <main className="lg:pt-[120px]">
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
