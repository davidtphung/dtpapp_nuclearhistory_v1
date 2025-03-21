
import React from 'react';
import { ExternalLink, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Presented by</span>
            <a 
              href="https://x.com/davidtphung" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold hover:text-primary transition-colors flex items-center gap-1"
            >
              David T Phung
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Powered by</span>
              <a 
                href="https://davidtphung.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-semibold hover:text-primary transition-colors"
              >
                NLT143
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              <a 
                href="https://warpcast.com/davidtphung" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors flex items-center gap-1"
                aria-label="Warpcast"
              >
                Warpcast
                <ExternalLink className="h-3 w-3" />
              </a>
              
              <a 
                href="https://youtube.com/playlist?list=PLqchICbseuRpn8PqBDDXwnpAp5MI-9-zN&si=_HIPzt7cMObwWsuX" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors"
                aria-label="YouTube podcast"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
