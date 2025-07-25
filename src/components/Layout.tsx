import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/use-theme'
import { ThemeCustomizer } from '@/components/ThemeCustomizer'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Settings } from 'lucide-react'
import { useMemo } from 'react'

export default function Layout() {
  const { settings } = useTheme()

  const backgroundStyle = useMemo(
    () => ({
      backgroundSize: '200% 200%',
      backgroundImage: `radial-gradient(ellipse at center, ${settings.startColor} 0%, ${settings.endColor} 100%)`,
      opacity: settings.opacity / 100,
      filter: `blur(${settings.intensity}px)`,
      animation: settings.animationEnabled
        ? 'gradient-move 15s ease infinite'
        : 'none',
    }),
    [settings],
  )

  return (
    <main
      className={cn(
        'flex flex-col min-h-screen items-center justify-center bg-background text-foreground p-4 relative overflow-hidden',
      )}
    >
      <div
        className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] -z-10 transition-all duration-1000"
        style={backgroundStyle}
      />
      <div className="w-full max-w-3xl mx-auto z-10">
        <Outlet />
      </div>
      {/* <div className="absolute bottom-4 right-4 z-20">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-lg"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Customize Theme</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-sm overflow-y-auto">
            <ThemeCustomizer />
          </SheetContent>
        </Sheet>
      </div> */}
    </main>
  )
}
