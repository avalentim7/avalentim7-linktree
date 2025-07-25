import { useState, useEffect, type ComponentProps } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import avalentimImg from '@/assets/avalentim.png'
import { cn } from '@/lib/utils'
import {
  Youtube,
  Music,
  Video,
  BookOpen,
  Instagram,
  Facebook,
  Twitter,
  Twitch,
} from 'lucide-react'

const socialLinks = [
  {
    name: 'TikTok',
    url: 'https://tiktok.com/@avalentimguitar_',
    icon: (props: ComponentProps<'img'>) => (
      <img
        src="https://img.usecurling.com/i?q=tiktok&color=white"
        alt="TikTok"
        {...props}
      />
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@avalentim7',
    icon: Youtube,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/avalentim7/',
    icon: Instagram,
  },
  // {
  //   name: 'Spotify',
  //   url: 'https://open.spotify.com/artist/your-artist-id',
  //   icon: (props: ComponentProps<'img'>) => (
  //     <img
  //       src="https://img.usecurling.com/i?q=spotify&color=white"
  //       alt="Spotify"
  //       {...props}
  //     />
  //   ),
  // },
  // {
  //   name: 'Facebook',
  //   url: 'https://facebook.com/andrevalentim',
  //   icon: Facebook,
  // },
  // {
  //   name: 'Twitter',
  //   url: 'https://twitter.com/andrevalentim',
  //   icon: Twitter,
  // },
  {
    name: 'Twitch',
    url: 'https://twitch.tv/kpdistance',
    icon: Twitch,
  },
]

const mainLinks = [
  {
    title: 'TikTok',
    url: 'https://tiktok.com/@avalentimguitar_',
    icon: (props: ComponentProps<'img'>) => (
      <img
        src="https://img.usecurling.com/i?q=tiktok&color=white"
        alt="TikTok"
        {...props}
      />
    ),
  },
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/avalentim7/',
    icon: Instagram,
  },
  {
    title: 'YouTube',
    url: 'https://www.youtube.com/@avalentim7',
    icon: Youtube,
  },
  {
    title: 'Cover de In The End',
    url: 'https://www.youtube.com/watch?v=DM0Sx0BcUdQ',
    icon: Video,
  },
  {
    title: 'Cover de Man In The Box',
    url: 'https://www.youtube.com/watch?v=sPO3gp0Zvpg',
    icon: Music,
  },
  // {
  //   title: 'Meus Cursos de Guitarra Online',
  //   url: 'https://cursos.andrevalentim.com',
  //   icon: BookOpen,
  // },
]

const Index = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const animationClasses = (baseDelay: number) =>
    cn(
      'opacity-0 animate-fade-in-up fill-mode-forwards',
      loaded ? 'opacity-100' : 'opacity-0',
      `animation-delay-${baseDelay}`,
    )

  return (
    <div className="flex flex-col items-center w-full text-center space-y-8 py-12">
      <header className="flex flex-col items-center space-y-4">
        <div
          className={cn(
            'relative rounded-full p-1 bg-red-gradient',
            'opacity-0 animate-scale-up fill-mode-forwards',
            loaded ? 'opacity-100' : 'opacity-0',
            'transition-all duration-300 hover:scale-105 hover:shadow-red-glow',
          )}
        >
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background">
            <AvatarImage
              src={avalentimImg}
              alt="André Valentim"
              className="avatar-img"
            />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
        </div>
        <div className={animationClasses(200)}>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground">
            André Valentim
          </h1>
        </div>
        <div className={animationClasses(300)}>
          <p className="text-base md:text-lg text-muted-foreground max-w-md">
            🎸 Guitarrista | 👨🏻‍💻 Desenvolvedor | 🎥 Dicas práticas, covers e
            inspiração musical | 🔥 Transformando paixão em conteúdo
          </p>
        </div>
      </header>

      <section className="w-full max-w-lg space-y-4 flex flex-col">
        {mainLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Link para ${link.title}`}
              className={cn(
                'opacity-0 animate-fade-in-up fill-mode-forwards',
                loaded ? 'opacity-100' : 'opacity-0',
                `animation-delay-${400 + index * 100}`,
              )}
            >
              <Button className="w-full h-16 md:h-[68px] text-lg md:text-xl font-semibold text-primary flex items-center justify-center space-x-4 px-6 rounded-lg hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99] active:translate-y-0 btn-gradient">
                <Icon className="w-6 h-6 md:w-7 md:h-7" />
                <span>{link.title}</span>
              </Button>
            </a>
          )
        })}
      </section>

      <section
        className={cn(
          'flex items-center justify-center space-x-5 pt-6',
          'opacity-0 animate-fade-in-up fill-mode-forwards',
          loaded ? 'opacity-100' : 'opacity-0',
          `animation-delay-${400 + mainLinks.length * 100}`,
        )}
      >
        {socialLinks.map((social) => {
          const Icon = social.icon
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Perfil de André Valentim no ${social.name}`}
              className="text-muted-foreground hover:text-primary transition-all duration-200 ease-in-out hover:scale-110"
            >
              <Icon className="w-8 h-8 md:w-9 md:h-9" />
            </a>
          )
        })}
      </section>

      <footer
        className={cn(
          'pt-12',
          'opacity-0 animate-fade-in-up fill-mode-forwards',
          loaded ? 'opacity-100' : 'opacity-0',
          `animation-delay-${500 + mainLinks.length * 100}`,
        )}
      >
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} André Valentim. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  )
}

export default Index
