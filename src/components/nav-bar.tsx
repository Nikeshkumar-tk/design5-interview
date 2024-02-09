import { cn } from "@/lib/utils"

export const Navbar = ({
    className
}: {
    className?: string
}) => {
    return (
        <header className={cn("sticky top-0 z-50 w-full border bg-background py-2", className)}>
            <div className="flex w-full justify-between items-center px-4 py-2 sm:px-20">
                <div className="text-2xl font-bold text-primary">Blog</div>
            </div>
        </header>
    )
}