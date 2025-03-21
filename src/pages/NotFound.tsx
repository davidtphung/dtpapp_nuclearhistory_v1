
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="glass-panel p-8 max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
          <a href="/" className="button-primary inline-flex">
            Return to Home
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
