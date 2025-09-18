'use client'
import { authClient } from '@/lib/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Bell,
  Search,
  Settings,
  LogOut,
  BarChart3,
  CreditCard,
  Home,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const TopBarComponent = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      current: pathname === '/dashboard',
    },
    {
      name: 'Transações',
      href: '/transactions',
      icon: CreditCard,
      current: pathname === '/transactions',
    },
    {
      name: 'Relatórios',
      href: '/reports',
      icon: BarChart3,
      current: pathname === '/reports',
    },
  ]

  const handleSignOut = async () => {
    await authClient.signOut()
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo e Branding */}
        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="flex items-center">
              <Image
                src="/Images/logo.svg"
                alt="LedgixAI"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="ml-2 text-xl font-bold text-white">
                LedgixAI
              </span>
            </div>
          </Link>

          {/* Navegação */}
          <nav className="hidden space-x-1 md:flex">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    item.current
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Ações da direita */}
        <div className="flex items-center space-x-4">
          {/* Busca */}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Notificações */}
          <Button
            variant="ghost"
            size="sm"
            className="relative text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500"></span>
          </Button>

          {/* Menu do usuário */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session?.user?.image || ''}
                    alt={session?.user?.name || 'User'}
                  />
                  <AvatarFallback className="bg-gray-700 text-white">
                    {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 border-gray-700 bg-gray-800"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium text-white">
                    {session?.user?.name || 'Usuário'}
                  </p>
                  <p className="text-xs leading-none text-gray-400">
                    {session?.user?.email || 'email@exemplo.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700 hover:text-white">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem
                className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default TopBarComponent
