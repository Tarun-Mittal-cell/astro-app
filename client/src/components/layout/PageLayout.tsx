import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function PageLayout({
  children,
  title,
  subtitle,
  badge,
  className = ""
}: PageLayoutProps) {
  return (
    <div className={`min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF] py-16 md:py-20 ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 mb-16"
        >
          {badge && (
            <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100 px-6 py-2 text-sm tracking-wide rounded-full">
              {badge}
            </Badge>
          )}
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </div>
  );
}