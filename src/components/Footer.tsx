import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.a
            href="#"
            className="text-xl font-bold gradient-text font-mono"
            whileHover={{ scale: 1.05 }}
          >
            &lt;DG/&gt;
          </motion.a>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart size={14} className="text-primary fill-primary" /> by Divyanshu Gupta
          </p>

          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
