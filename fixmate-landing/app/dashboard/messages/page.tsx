"use client"

import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  MoreVertical,
  Send,
  Paperclip,
  Image,
  Smile,
  Phone,
  Video,
  Info,
  Check,
  CheckCheck,
  Clock,
  Filter,
  Home,
  Menu,
  Bell,
  LogOut,
  User,
  Calendar,
  TrendingUp,
  MessageSquare,
  Settings,
  BoxIcon as Toolbox,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "Marie Laurent",
    avatar: "/placeholder.svg?height=100&width=100",
    lastMessage: "Bonjour, à quelle heure arriverez-vous aujourd'hui ?",
    timestamp: "10:23",
    unread: 2,
    online: true,
    service: "Réparation plomberie",
    address: "15 Rue des Lilas, Paris",
    date: "2025-05-20",
  },
  {
    id: 2,
    name: "Jean Dupont",
    avatar: "/placeholder.svg?height=100&width=100",
    lastMessage: "Merci pour votre travail rapide et efficace !",
    timestamp: "Hier",
    unread: 0,
    online: false,
    service: "Installation électrique",
    address: "8 Avenue Victor Hugo, Lyon",
    date: "2025-05-18",
  },
  {
    id: 3,
    name: "Sophie Martin",
    avatar: "/placeholder.svg?height=100&width=100",
    lastMessage: "Pouvez-vous me recommander un bon produit pour entretenir la plomberie ?",
    timestamp: "Hier",
    unread: 0,
    online: true,
    service: "Réparation plomberie",
    address: "22 Rue de la Paix, Marseille",
    date: "2025-05-17",
  },
  {
    id: 4,
    name: "Pierre Lefebvre",
    avatar: "/placeholder.svg?height=100&width=100",
    lastMessage: "Est-ce que vous pourriez venir plus tôt demain ?",
    timestamp: "Lun",
    unread: 0,
    online: false,
    service: "Installation électrique",
    address: "5 Boulevard Saint-Michel, Paris",
    date: "2025-05-16",
  },
  {
    id: 5,
    name: "Isabelle Moreau",
    avatar: "/placeholder.svg?height=100&width=100",
    lastMessage: "J'ai une autre fuite sous l'évier, pouvez-vous repasser ?",
    timestamp: "15/05",
    unread: 0,
    online: false,
    service: "Réparation plomberie",
    address: "12 Rue du Commerce, Nice",
    date: "2025-05-15",
  },
]

// Mock data for messages in a conversation
const messages = [
  {
    id: 1,
    sender: "client",
    text: "Bonjour, à quelle heure arriverez-vous aujourd'hui ?",
    timestamp: "10:23",
    status: "read",
  },
  {
    id: 2,
    sender: "me",
    text: "Bonjour Marie ! Je serai chez vous vers 14h comme convenu. Est-ce que cela vous convient toujours ?",
    timestamp: "10:25",
    status: "read",
  },
  {
    id: 3,
    sender: "client",
    text: "Oui, parfait ! Je serai à la maison. Merci de me prévenir.",
    timestamp: "10:26",
    status: "read",
  },
  {
    id: 4,
    sender: "me",
    text: "Très bien. N'hésitez pas à me décrire plus précisément le problème de plomberie pour que je puisse apporter les outils nécessaires.",
    timestamp: "10:28",
    status: "read",
  },
  {
    id: 5,
    sender: "client",
    text: "Il s'agit d'une fuite sous l'évier de la cuisine. L'eau s'accumule dans le placard en dessous. J'ai mis une bassine pour l'instant.",
    timestamp: "10:30",
    status: "read",
  },
  {
    id: 6,
    sender: "me",
    text: "Je vois, merci pour ces précisions. Je pense qu'il s'agit probablement d'un joint défectueux ou d'un raccord desserré. J'apporterai tout le nécessaire pour réparer cela rapidement.",
    timestamp: "10:32",
    status: "read",
  },
  {
    id: 7,
    sender: "client",
    text: "Super, merci beaucoup ! À tout à l'heure alors.",
    timestamp: "10:33",
    status: "read",
  },
  {
    id: 8,
    sender: "me",
    text: "À tout à l'heure ! N'hésitez pas si vous avez d'autres questions d'ici là.",
    timestamp: "10:34",
    status: "sent",
  },
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [conversationList, setConversationList] = useState(conversations)
  const [currentMessages, setCurrentMessages] = useState(messages)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileConversationOpen, setIsMobileConversationOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter conversations based on search query and active tab
  const filteredConversations = conversationList.filter((conversation) => {
    const matchesSearch = conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" || (activeTab === "unread" && conversation.unread > 0) || activeTab === "archived"
    return matchesSearch && matchesTab
  })

  // Scroll to bottom of messages when conversation changes or new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentMessages, activeConversation])

  // Handle sending a new message
  const handleSendMessage = () => {
    if (messageInput.trim() === "") return

    const newMessage = {
      id: currentMessages.length + 1,
      sender: "me",
      text: messageInput,
      timestamp: format(new Date(), "HH:mm"),
      status: "sending",
    }

    setCurrentMessages([...currentMessages, newMessage])
    setMessageInput("")

    // Simulate message being sent
    setTimeout(() => {
      setCurrentMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "sent" } : msg)))
    }, 1000)

    // Simulate message being delivered
    setTimeout(() => {
      setCurrentMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)),
      )
    }, 2000)

    // Simulate client response after a delay
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const clientResponse = {
          id: currentMessages.length + 2,
          sender: "client",
          text: "D'accord, merci pour l'information !",
          timestamp: format(new Date(), "HH:mm"),
          status: "read",
        }
        setCurrentMessages((prev) => [...prev, clientResponse])
      }, 5000)
    }
  }

  // Handle selecting a conversation
  const handleSelectConversation = (conversation: (typeof conversations)[0]) => {
    setActiveConversation(conversation)
    setIsMobileConversationOpen(true)

    // Mark conversation as read
    if (conversation.unread > 0) {
      setConversationList(conversationList.map((conv) => (conv.id === conversation.id ? { ...conv, unread: 0 } : conv)))
    }
  }

  // Render message status icon
  const renderMessageStatus = (status: string) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-gray-400" />
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
        <div className="flex items-center gap-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col gap-6 py-6">
                <div className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-blue-600" />
                  <span className="text-xl font-bold">Service à la Maison</span>
                </div>

                <div className="flex flex-col items-center py-6">
                  <Avatar className="mb-3 h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=200&width=200" alt="Thomas Dubois" />
                    <AvatarFallback>TD</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">Thomas Dubois</h3>
                  <p className="text-sm text-muted-foreground">Plombier & Électricien</p>
                </div>

                <Separator />

                <nav className="flex flex-col gap-1">
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 px-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Toolbox className="h-5 w-5" />
                      <span>Tableau de bord</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 px-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Calendrier</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/earnings">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 px-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <TrendingUp className="h-5 w-5" />
                      <span>Revenus</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/messages">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 px-2 bg-blue-50 text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Messages</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Profil</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 px-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Paramètres</span>
                  </Button>
                </nav>

                <Separator />

                <Button variant="ghost" className="justify-start gap-3 px-2 text-red-500 hover:text-red-600">
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <span className="text-lg font-bold">Messages</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=200&width=200" alt="Thomas Dubois" />
            <AvatarFallback>TD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r bg-white md:block">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Service à la Maison</span>
          </div>

          <div className="flex flex-col items-center py-6">
            <Avatar className="mb-3 h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=200&width=200" alt="Thomas Dubois" />
              <AvatarFallback>TD</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">Thomas Dubois</h3>
            <p className="text-sm text-muted-foreground">Plombier & Électricien</p>
          </div>

          <Separator />

          <nav className="flex flex-col gap-1 p-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-3 px-3">
                <Toolbox className="h-5 w-5" />
                <span>Tableau de bord</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-3 px-3">
                <Calendar className="h-5 w-5" />
                <span>Calendrier</span>
              </Button>
            </Link>
            <Link href="/dashboard/earnings">
              <Button variant="ghost" className="w-full justify-start gap-3 px-3">
                <TrendingUp className="h-5 w-5" />
                <span>Revenus</span>
              </Button>
            </Link>
            <Link href="/dashboard/messages">
              <Button variant="ghost" className="w-full justify-start gap-3 px-3 bg-blue-50 text-blue-600">
                <MessageSquare className="h-5 w-5" />
                <span>Messages</span>
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-3 px-3">
              <User className="h-5 w-5" />
              <span>Profil</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 px-3">
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </Button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-red-500 hover:text-red-600">
              <LogOut className="h-5 w-5" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="flex h-[calc(100vh-4rem)] md:h-screen">
            {/* Conversation List */}
            <div
              className={`w-full border-r bg-white md:w-80 ${isMobileConversationOpen ? "hidden md:block" : "block"}`}
            >
              <div className="flex h-16 items-center justify-between border-b px-4">
                <h2 className="text-lg font-semibold">Conversations</h2>
                <Button variant="ghost" size="icon">
                  <Filter className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="px-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="unread">Non lus</TabsTrigger>
                  <TabsTrigger value="archived">Archivés</TabsTrigger>
                </TabsList>
              </Tabs>

              <ScrollArea className="h-[calc(100vh-12rem)] md:h-[calc(100vh-8rem)]">
                <div className="p-2">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-100 ${
                          activeConversation.id === conversation.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="mb-1 flex items-center justify-between">
                            <h3 className="font-medium">{conversation.name}</h3>
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                          </div>
                          <p className="truncate text-sm text-gray-500">{conversation.lastMessage}</p>
                          <p className="mt-1 text-xs text-gray-400">{conversation.service}</p>
                        </div>
                        {conversation.unread > 0 && (
                          <Badge className="ml-auto shrink-0 bg-blue-500">{conversation.unread}</Badge>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="flex h-32 items-center justify-center">
                      <p className="text-sm text-gray-500">Aucune conversation trouvée</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div
              className={`flex w-full flex-col bg-white md:block ${
                isMobileConversationOpen ? "block" : "hidden md:block"
              }`}
            >
              {/* Chat Header */}
              <div className="flex h-16 items-center justify-between border-b px-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMobileConversationOpen(false)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activeConversation.avatar || "/placeholder.svg"} alt={activeConversation.name} />
                    <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{activeConversation.name}</h3>
                      {activeConversation.online && (
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-600 text-xs">
                          En ligne
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{activeConversation.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                      <DropdownMenuItem>Voir le service</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Marquer comme non lu</DropdownMenuItem>
                      <DropdownMenuItem>Archiver la conversation</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Bloquer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {/* Service Info */}
                  <div className="mx-auto mb-6 max-w-sm rounded-lg bg-blue-50 p-4 text-center">
                    <h4 className="mb-1 font-medium">{activeConversation.service}</h4>
                    <p className="text-sm text-gray-600">{activeConversation.address}</p>
                    <p className="text-sm text-gray-600">
                      Date: {format(new Date(activeConversation.date), "d MMMM yyyy", { locale: fr })}
                    </p>
                  </div>

                  {/* Messages */}
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "client" && (
                        <Avatar className="mr-2 mt-1 h-8 w-8">
                          <AvatarImage
                            src={activeConversation.avatar || "/placeholder.svg"}
                            alt={activeConversation.name}
                          />
                          <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.text}</p>
                        <div
                          className={`mt-1 flex items-center justify-end gap-1 text-xs ${
                            message.sender === "me" ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          <span>{message.timestamp}</span>
                          {message.sender === "me" && renderMessageStatus(message.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Écrivez votre message..."
                    className="flex-1"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={handleSendMessage}
                    disabled={messageInput.trim() === ""}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Info Panel (Hidden on mobile) */}
            <div className="hidden w-80 border-l bg-white lg:block">
              <div className="flex h-16 items-center justify-between border-b px-4">
                <h3 className="font-medium">Informations</h3>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <div className="mb-6 flex flex-col items-center">
                  <Avatar className="mb-3 h-20 w-20">
                    <AvatarImage src={activeConversation.avatar || "/placeholder.svg"} alt={activeConversation.name} />
                    <AvatarFallback>{activeConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">{activeConversation.name}</h3>
                  <p className="text-sm text-gray-500">Client depuis 2023</p>
                  {activeConversation.online && <Badge className="mt-2 bg-green-500">En ligne</Badge>}
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-500">Service actuel</h4>
                    <div className="rounded-lg border p-3">
                      <h5 className="font-medium">{activeConversation.service}</h5>
                      <p className="text-sm text-gray-500">{activeConversation.address}</p>
                      <p className="text-sm text-gray-500">
                        Date: {format(new Date(activeConversation.date), "d MMMM yyyy", { locale: fr })}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        Voir les détails
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-500">Historique des services</h4>
                    <div className="space-y-2">
                      <div className="rounded-lg border p-3">
                        <h5 className="font-medium">Réparation plomberie</h5>
                        <p className="text-sm text-gray-500">15/04/2025</p>
                        <Badge variant="outline" className="mt-1 border-green-200 bg-green-50 text-green-600 text-xs">
                          Terminé
                        </Badge>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h5 className="font-medium">Installation robinet</h5>
                        <p className="text-sm text-gray-500">02/03/2025</p>
                        <Badge variant="outline" className="mt-1 border-green-200 bg-green-50 text-green-600 text-xs">
                          Terminé
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-500">Fichiers partagés</h4>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <Image className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">photo_fuite.jpg</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Image className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">facture_precedente.pdf</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Phone className="h-4 w-4" />
                    <span>Appeler</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-red-600">
                    <span>Bloquer</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
        <div className="flex items-center justify-around">
          <Link href="/dashboard">
            <Button variant="ghost" className="flex flex-1 flex-col items-center justify-center py-3">
              <Toolbox className="h-5 w-5" />
              <span className="mt-1 text-xs">Tableau</span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="flex flex-1 flex-col items-center justify-center py-3">
              <Calendar className="h-5 w-5" />
              <span className="mt-1 text-xs">Calendrier</span>
            </Button>
          </Link>
          <Link href="/dashboard/messages">
            <Button variant="ghost" className="flex flex-1 flex-col items-center justify-center py-3 text-blue-600">
              <MessageSquare className="h-5 w-5" />
              <span className="mt-1 text-xs">Messages</span>
            </Button>
          </Link>
          <Link href="/dashboard/earnings">
            <Button variant="ghost" className="flex flex-1 flex-col items-center justify-center py-3">
              <TrendingUp className="h-5 w-5" />
              <span className="mt-1 text-xs">Revenus</span>
            </Button>
          </Link>
          <Button variant="ghost" className="flex flex-1 flex-col items-center justify-center py-3">
            <User className="h-5 w-5" />
            <span className="mt-1 text-xs">Profil</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
