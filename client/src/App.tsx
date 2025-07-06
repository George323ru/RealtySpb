import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import CartProvider from "./components/CartProvider";
import { TooltipProvider } from "./components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/header";
import Footer from "./components/footer";
import FloatingCTA from "./components/FloatingCTA";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/home";
import Buy from "./pages/buy";
import Sell from "./pages/sell";
import Rent from "./pages/rent";
import NewBuildings from "./pages/NewBuildings";
import NewBuildingDetail from "./pages/new-building-detail";
import Secondary from "./pages/secondary";
import PropertyDetail from "./pages/PropertyDetail";
import Services from "./pages/services";
import ServiceDetail from "./pages/ServiceDetail";
import Land from "./pages/land";
import About from "./pages/about";
import RealtorConstructor from "./pages/realtor-constructor";
import Reviews from "./pages/reviews";
import Blog from "./pages/blog";
import BlogPost from "./pages/BlogPost";
import Contacts from "./pages/contacts";
import Cart from "./pages/cart";
import Calculator from "./pages/calculator";
import PrivacyPolicy from "./pages/privacy-policy";
import AdminPage from "./pages/admin";
import NotFound from "./pages/not-found";
import Team from './pages/team'
import Contact from './pages/contacts'
import AllServices from './pages/services/AllServices'
import Construction from './pages/services/Construction'
import DesignProject from './pages/services/DesignProject'
import EngineeringSystems from './pages/services/EngineeringSystems'
import Heating from './pages/services/engineering/Heating'
import GasSupplyPage from './pages/services/engineering/GasSupply'
import Renovation from './pages/services/Renovation'
import LegalCheck from './pages/services/LegalCheck'
import PreSalePreparation from './pages/services/PreSalePreparation'
import VodosnabzhenieIKanalizaciya from './pages/services/engineering/VodosnabzhenieIKanalizaciya'
import Electricity from './pages/services/engineering/Electricity'
import Ventilation from './pages/services/engineering/Ventilation'
import SecuritySystems from './pages/services/engineering/SecuritySystems'

const Router = () => {
  return (
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
      <Route path="/services/all" component={AllServices} />
      <Route
        path="/services/engineering-systems"
        component={EngineeringSystems}
      />
      <Route path="/services/engineering/heating" component={Heating} />
      <Route path="/services/engineering/gas-supply" component={GasSupplyPage} />
      <Route path="/services/engineering/ventilation" component={Ventilation} />
      <Route
        path="/services/engineering/security-systems"
        component={SecuritySystems}
      />
      <Route path="/services/design-project" component={DesignProject} />
      <Route path="/services/renovation" component={Renovation} />
      <Route path="/services/construction" component={Construction} />
      <Route
        path="/services/engineering/vodosnabzhenie-i-kanalizaciya"
        component={VodosnabzhenieIKanalizaciya}
      />
      <Route
        path="/services/engineering/electricity"
        component={Electricity}
      />
      <Route
        path="/services/presale-preparation"
        component={PreSalePreparation}
      />
      <Route path="/services/:id" component={ServiceDetail} />
      <Route path="/land" component={Land} />
      <Route path="/about" component={About} />
      <Route path="/team" component={RealtorConstructor} />
      <Route path="/realtor-constructor" component={RealtorConstructor} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/cart" component={Cart} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-neutral-50">
            <ScrollToTop />
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
