import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react'

type PredefinedTheme = 'sunrise' | 'ocean' | 'forest' | 'night-sky' | 'custom'

type ThemeSettings = {
  theme: PredefinedTheme
  startColor: string
  endColor: string
  intensity: number
  opacity: number
  animationEnabled: boolean
}

type ThemeContextType = {
  settings: ThemeSettings
  setSettings: (settings: Partial<ThemeSettings>) => void
  setTheme: (theme: PredefinedTheme) => void
}

const predefinedThemes: Record<
  Exclude<PredefinedTheme, 'custom'>,
  Omit<ThemeSettings, 'theme' | 'animationEnabled' | 'opacity' | 'intensity'>
> = {
  sunrise: { startColor: 'hsl(16, 100%, 70%)', endColor: 'hsl(45, 100%, 60%)' },
  ocean: { startColor: 'hsl(210, 100%, 50%)', endColor: 'hsl(180, 100%, 30%)' },
  forest: { startColor: 'hsl(120, 60%, 30%)', endColor: 'hsl(90, 40%, 40%)' },
  'night-sky': {
    startColor: 'hsl(240, 60%, 20%)',
    endColor: 'hsl(260, 80%, 10%)',
  },
}

const defaultSettings: ThemeSettings = {
  theme: 'night-sky',
  ...predefinedThemes['night-sky'],
  intensity: 50,
  opacity: 30,
  animationEnabled: true,
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettingsState] = useState<ThemeSettings>(() => {
    try {
      const storedSettings = localStorage.getItem('theme-settings')
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings)
        if (parsed.theme && parsed.startColor && parsed.endColor) {
          return { ...defaultSettings, ...parsed }
        }
      }
    } catch (error) {
      console.error('Failed to parse theme settings from localStorage', error)
    }
    return defaultSettings
  })

  useEffect(() => {
    try {
      localStorage.setItem('theme-settings', JSON.stringify(settings))
    } catch (error) {
      console.error('Failed to save theme settings to localStorage', error)
    }
  }, [settings])

  const setSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...newSettings }
      if (newSettings.theme && newSettings.theme !== 'custom') {
        updated.startColor =
          predefinedThemes[
            newSettings.theme as Exclude<PredefinedTheme, 'custom'>
          ].startColor
        updated.endColor =
          predefinedThemes[
            newSettings.theme as Exclude<PredefinedTheme, 'custom'>
          ].endColor
      } else if (newSettings.startColor || newSettings.endColor) {
        updated.theme = 'custom'
      }
      return updated
    })
  }

  const setTheme = (theme: PredefinedTheme) => {
    if (theme === 'custom') {
      setSettings({ theme })
    } else {
      setSettings({
        theme,
        startColor: predefinedThemes[theme].startColor,
        endColor: predefinedThemes[theme].endColor,
      })
    }
  }

  const value = useMemo(() => ({ settings, setSettings, setTheme }), [settings])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
