import { Helmet } from 'react-helmet-async'
import { Package, ShoppingCart, Users, IndianRupee } from 'lucide-react'
import { StatCard } from './components/StatCard'
import { SalesOverviewChart } from './components/SalesOverviewChart'
import { RecentOrders } from './components/RecentOrders'
import { TopProducts } from './components/TopProducts'
import { OrderStatusDonut } from './components/OrderStatusDonut'
import { formatCurrency } from '@/utils/format'
import { useDashboardStats } from '@/hooks/useAdminDashboard'

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats()

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Bloome By Her</title>
      </Helmet>
      <h1 className="mb-6 font-heading text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Package}
          label="Total Products"
          value={String(stats?.totalProducts ?? 0)}
          isLoading={isLoading}
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={String(stats?.totalOrders ?? 0)}
          isLoading={isLoading}
        />
        <StatCard
          icon={Users}
          label="Total Customers"
          value={String(stats?.totalCustomers ?? 0)}
          isLoading={isLoading}
        />
        <StatCard
          icon={IndianRupee}
          label="Total Revenue"
          value={formatCurrency(stats?.totalRevenue ?? 0)}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <SalesOverviewChart />
        <RecentOrders />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <TopProducts />
        <OrderStatusDonut />
      </div>
    </>
  )
}
