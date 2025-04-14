import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu, Search, X, Github } from 'lucide-react';
import { cn } from "@/lib/utils";

interface HeaderProps {
    isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMobile }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b border-border/40",
                "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                "px-4 sm:px-6 lg:px-8"
            )}
        >
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <a href="/" className="flex items-center">
                        <img
                            src="https://placehold.co/150x40?text=Logo&font=Montserrat" // Placeholder logo - replace with your actual logo URL
                            alt="Company Logo"
                            className={cn(
                                "h-8 w-auto",
                                isMobile ? "mr-2" : "mr-4" // Adjust spacing based on screen size
                            )}
                        />
                        {!isMobile && <span className="font-semibold text-lg text-foreground">My Company</span>}
                    </a>
                </div>

                {/* Search Input (Hidden on small screens) */}
                {!isMobile && (
                    <div className="flex-1 hidden md:flex justify-center">
                        <div className="w-full max-w-md">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full"
                            />
                        </div>
                    </div>
                )}

                {/* Actions (Menu on small screens, Buttons on larger) */}
                <div className="flex items-center gap-4">
                    {isMobile ? (
                         <Sheet open={open} onOpenChange={setOpen}>
                         <SheetTrigger asChild>
                           <Button variant="ghost" size="icon" aria-label="Menu">
                             {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                           </Button>
                         </SheetTrigger>
                         <SheetContent side="left" className="w-full sm:w-[300px] bg-background">
                           <SheetHeader>
                             <SheetTitle>Menu</SheetTitle>
                             <SheetDescription>
                               Explore the website.
                             </SheetDescription>
                           </SheetHeader>
                           <div className="mt-6 space-y-4">
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full"
                                />
                               <Button variant="outline" className="w-full justify-start">
                                   <Github className="mr-2 h-4 w-4" />
                                   GitHub
                               </Button>
                               <Button className="w-full justify-start">
                                    Sign In
                                </Button>
                           </div>
                         </SheetContent>
                       </Sheet>
                    ) : (
                        <>
                            <Button variant="ghost" className="hidden sm:flex">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                            <Button variant="outline" className="hidden sm:flex">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                            <Button className="hidden sm:flex">
                                Sign In
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

const ResponsiveHeader = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Example: 768px is considered mobile
        };

        handleResize(); // Check on initial load
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Header isMobile={isMobile} />
    );
};

export default ResponsiveHeader;
