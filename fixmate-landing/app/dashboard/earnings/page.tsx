"use client"

import { useState } from "react"
import { format, subDays, subMonths } from "date-fns"
import { fr } from "date-fns/locale"
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  TrendingUp,
  DollarSign,
  Clock,
  FileText,
} from "lucide-react"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for earnings
const dailyEarningsData = [
  { date: format(subDays(new Date(), 6), "dd/MM"), amount: 120, jobs: 2 },
  { date: format(subDays(new Date(), 5), "dd/MM"), amount: 90, jobs: 1 },
  { date: format(subDays(new Date(), 4), "dd/MM"), amount: 0, jobs: 0 },
  { date: format(subDays(new Date(), 3), "dd/MM"), amount: 180, jobs: 3 },
  { date: format(subDays(new Date(), 2), "dd/MM"), amount: 150, jobs: 2 },
  { date: format(subDays(new Date(), 1), "dd/MM"), amount: 120, jobs: 2 },
  { date: format(new Date(), "dd/MM"), amount: 0, jobs: 0 },
]

const weeklyEarningsData = [
  { week: "Sem 1", amount: 540, jobs: 8 },
  { week: "Sem 2", amount: 620, jobs: 9 },
  { week: "Sem 3", amount: 750, jobs: 11 },
  { week: "Sem 4", amount: 890, jobs: 13 },
]

const monthlyEarningsData = [
  { month: format(subMonths(new Date(), 5), "MMM", { locale: fr }), amount: 1200, jobs: 18 },
  { month: format(subMonths(new Date(), 4), "MMM", { locale: fr }), amount: 1450, jobs: 21 },
  { month: format(subMonths(new Date(), 3), "MMM", { locale: fr }), amount: 1320, jobs: 19 },
  { month: format(subMonths(new Date(), 2), "MMM", { locale: fr }), amount: 1680, jobs: 24 },
  { month: format(subMonths(new Date(), 1), "MMM", { locale: fr }), amount: 1890, jobs: 27 },
  { month: format(new Date(), "MMM", { locale: fr }), amount: 2100, jobs: 30 },
]

const serviceTypeData = [
  { name: "Plomberie", value: 45 },
  { name: "Électricité", value: 30 },
  { name: "Rénovation", value: 15 },
  { name: "Autres", value: 10 },
]

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"]

const recentTransactions = [
  {
    id: 1,
    client: "Marie Laurent",
    service: "Réparation plomberie",
    date: format(subDays(new Date(), 1), "dd/MM/yyyy"),
    amount: "€120",
    status: "completed",
  },
  {
    id: 2,
    client: "Jean Dupont",
    service: "Installation électrique",
    date: format(subDays(new Date(), 2), "dd/MM/yyyy"),
    amount: "€180",
    status: "completed",
  },
  {
    id: 3,
    client: "Sophie Martin",
    service: "Réparation plomberie",
    date: format(subDays(new Date(), 3), "dd/MM/yyyy"),
    amount: "€90",
    status: "completed",
  },
  {
    id: 4,
    client: "Pierre Lefebvre",
    service: "Installation électrique",
    date: format(subDays(new Date(), 5), "dd/MM/yyyy"),
    amount: "€150",
    status: "completed",
  },
  {
    id: 5,
    client: "Isabelle Moreau",
    service: "Réparation plomberie",
    date: format(subDays(new Date(), 7), "dd/MM/yyyy"),
    amount: "€75",
    status: "completed",
  },
]

export default function EarningsPage() {
  const [period, setPeriod] = useState("weekly")

  // Calculate total earnings and jobs
  const totalEarnings = monthlyEarningsData.reduce((sum, item) => sum + item.amount, 0)
  const totalJobs = monthlyEarningsData.reduce((sum, item) => sum + item.jobs, 0)
  const averagePerJob = totalJobs > 0 ? totalEarnings / totalJobs : 0

  // Get data based on selected period
  const getChartData = () => {
    switch (period) {
      case "daily":
        return dailyEarningsData
      case "weekly":
        return weeklyEarningsData
      case "monthly":
        return monthlyEarningsData
      default:
        return weeklyEarningsData
    }
  }

  const chartData = getChartData()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Retour</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Rapport de Revenus Détaillé</h1>
            </div>
            <p className="text-sm text-muted-foreground">Analyse complète de vos revenus et performances financières</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filtrer</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Tous les services</DropdownMenuItem>
                <DropdownMenuItem>Plomberie</DropdownMenuItem>
                <DropdownMenuItem>Électricité</DropdownMenuItem>
                <DropdownMenuItem>Rénovation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Période</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Cette semaine</DropdownMenuItem>
                <DropdownMenuItem>Ce mois</DropdownMenuItem>
                <DropdownMenuItem>Ce trimestre</DropdownMenuItem>
                <DropdownMenuItem>Cette année</DropdownMenuItem>
                <DropdownMenuItem>Personnalisé...</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span>Exporter</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <CardTitle className="mb-1 text-2xl">€{totalEarnings.toLocaleString()}</CardTitle>
              <CardDescription>Revenus totaux</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle className="mb-1 text-2xl">{totalJobs}</CardTitle>
              <CardDescription>Services réalisés</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <CardTitle className="mb-1 text-2xl">€{averagePerJob.toFixed(2)}</CardTitle>
              <CardDescription>Moyenne par service</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <Clock className="h-6 w-6" />
              </div>
              <CardTitle className="mb-1 text-2xl">+12%</CardTitle>
              <CardDescription>Croissance mensuelle</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Évolution des revenus</CardTitle>
                <CardDescription>Analyse de vos revenus sur la période</CardDescription>
              </div>
              <Tabs value={period} onValueChange={setPeriod} className="w-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="daily">Jour</TabsTrigger>
                  <TabsTrigger value="weekly">Semaine</TabsTrigger>
                  <TabsTrigger value="monthly">Mois</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    amount: {
                      label: "Montant (€)",
                      color: "hsl(var(--chart-1))",
                    },
                    jobs: {
                      label: "Services",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey={period === "daily" ? "date" : period === "weekly" ? "week" : "month"}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="amount"
                        name="Revenus (€)"
                        fill="var(--color-amount)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="jobs"
                        name="Nombre de services"
                        fill="var(--color-jobs)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition par service</CardTitle>
              <CardDescription>Distribution de vos revenus par type de service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={serviceTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions récentes</CardTitle>
            <CardDescription>Historique de vos derniers paiements reçus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-muted-foreground">
                    <th className="pb-3 pl-4">Client</th>
                    <th className="pb-3">Service</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Montant</th>
                    <th className="pb-3 pr-4">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b text-sm">
                      <td className="py-3 pl-4">{transaction.client}</td>
                      <td className="py-3">{transaction.service}</td>
                      <td className="py-3">{transaction.date}</td>
                      <td className="py-3 font-medium">{transaction.amount}</td>
                      <td className="py-3 pr-4">
                        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                          Payé
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm">
                Voir toutes les transactions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Insights */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des performances</CardTitle>
              <CardDescription>Indicateurs clés de performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Taux de conversion des demandes</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[75%] rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Satisfaction client</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[92%] rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Taux de réponse</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[88%] rounded-full bg-purple-500"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Ponctualité</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[95%] rounded-full bg-amber-500"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prévisions et objectifs</CardTitle>
              <CardDescription>Projections basées sur vos performances actuelles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Objectif mensuel</p>
                    <p className="text-xl font-bold">€2,500</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Réalisé</p>
                    <p className="text-xl font-bold">€2,100</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progression</p>
                    <p className="text-xl font-bold text-green-600">84%</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2 font-medium">Prévisions pour les 3 prochains mois</h4>
                  <div className="h-[150px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Actuel", amount: 2100 },
                          { month: "M+1", amount: 2400 },
                          { month: "M+2", amount: 2700 },
                          { month: "M+3", amount: 3100 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
