import { useLocation } from "react-router-dom";
import {
  Home, Users, Heart, Briefcase, TrendingUp, Newspaper, Mail,
} from "lucide-react";
import { PAGES } from "@/constants/navigation";
import { usePageTransition } from "@/components/layout/PageTransition";

const PAGE_ICONS: Record<string, React.ElementType> = {
  Home,
  About: Users,
  Culture: Heart,
  Careers: Briefcase,
  Investors: TrendingUp,
  Blog: Newspaper,
  Contact: Mail,
};

export function PageNavigator() {
  const { pathname } = useLocation();
  const { navigateTo } = usePageTransition();

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 sm:bottom-7 sm:gap-4">
      {PAGES.map((page) => {
        const isActive = pathname === page.href;
        const Icon = PAGE_ICONS[page.label];

        return (
          <button
            key={page.href}
            onClick={() => navigateTo(page.href)}
            className={`group relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 sm:h-12 sm:w-12 ${
              isActive
                ? "border-primary/40 bg-card text-primary shadow-[0_0_12px_hsl(var(--primary)/0.25)]"
                : "border-border bg-card text-muted-foreground hover:border-primary/20 hover:text-foreground active:scale-90"
            }`}
            aria-label={page.label}
          >
            {Icon && <Icon size={20} strokeWidth={1.5} />}
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card px-3 py-1 text-[10px] font-medium text-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:-top-10 group-hover:opacity-100 sm:text-[11px]">
              {page.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
