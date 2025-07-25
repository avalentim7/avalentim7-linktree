import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'

export const ThemeCustomizer = () => {
  const { settings, setSettings, setTheme } = useTheme()

  const handleColorChange = (
    colorType: 'startColor' | 'endColor',
    value: string,
  ) => {
    setSettings({ [colorType]: value, theme: 'custom' })
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>Customize Background</SheetTitle>
        <SheetDescription>
          Personalize the application's visual appearance. Changes are saved
          automatically.
        </SheetDescription>
      </SheetHeader>
      <div className="space-y-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="theme-select">Gradient Theme</Label>
          <Select
            value={settings.theme}
            onValueChange={(value) => setTheme(value as any)}
          >
            <SelectTrigger id="theme-select" className="w-full">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sunrise">Sunrise</SelectItem>
              <SelectItem value="ocean">Ocean</SelectItem>
              <SelectItem value="forest">Forest</SelectItem>
              <SelectItem value="night-sky">Night Sky</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Custom Colors (HSL format)</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-color">Start Color</Label>
              <Input
                id="start-color"
                value={settings.startColor}
                onChange={(e) =>
                  handleColorChange('startColor', e.target.value)
                }
                placeholder="e.g., hsl(16, 100%, 70%)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-color">End Color</Label>
              <Input
                id="end-color"
                value={settings.endColor}
                onChange={(e) => handleColorChange('endColor', e.target.value)}
                placeholder="e.g., hsl(45, 100%, 60%)"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="intensity">
            Intensity (Blur): {settings.intensity}px
          </Label>
          <Slider
            id="intensity"
            min={0}
            max={100}
            step={1}
            value={[settings.intensity]}
            onValueChange={([value]) => setSettings({ intensity: value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="opacity">Opacity: {settings.opacity}%</Label>
          <Slider
            id="opacity"
            min={0}
            max={100}
            step={1}
            value={[settings.opacity]}
            onValueChange={([value]) => setSettings({ opacity: value })}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <Label htmlFor="animation-switch">Subtle Animation</Label>
            <p className="text-xs text-muted-foreground">
              Enable a gentle shifting effect on the gradient.
            </p>
          </div>
          <Switch
            id="animation-switch"
            checked={settings.animationEnabled}
            onCheckedChange={(checked) =>
              setSettings({ animationEnabled: checked })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Live Preview</Label>
          <div className="h-32 w-full rounded-md border border-border/50 transition-all relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundSize: '200% 200%',
                backgroundImage: `radial-gradient(ellipse at center, ${settings.startColor} 0%, ${settings.endColor} 100%)`,
                opacity: settings.opacity / 100,
                filter: `blur(${settings.intensity}px)`,
                animation: settings.animationEnabled
                  ? 'gradient-move 15s ease infinite'
                  : 'none',
              }}
            />
          </div>
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}
