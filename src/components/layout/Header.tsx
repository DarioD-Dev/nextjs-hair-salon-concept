import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { Nav } from "./Nav";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border-subtle bg-surface/80 backdrop-blur">
      <Container className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-4 sm:gap-4">
        <Logo className="col-start-1 mr-auto" />
        <Nav className="col-start-2 hidden md:block justify-self-center" />
        <div className="col-start-3 flex items-center justify-end gap-0 sm:gap-2">
          <LocaleSwitcher />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
