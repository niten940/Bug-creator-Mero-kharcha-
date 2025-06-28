import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, DollarSign, PieChart, Calendar } from 'lucide-react';
import { Expense, Category } from '../types';
import NotificationModal from './NotificationModal';

interface DashboardProps {
  totalExpenses: number;
  monthlyExpenses: number;
  pendingExpenses: number;
  categories: Category[];
  expenses: Expense[];
  onAddExpense: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  totalExpenses, 
  monthlyExpenses, 
  pendingExpenses,
  categories,
  expenses,
  onAddExpense
}) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'reports' | 'approvals' | 'schedule' | null;
    data: any;
  }>({
    isOpen: false,
    type: null,
    data: null
  });

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  
  const stats = [
    {
      title: 'Total Expenses',
      value: `Rs. ${totalExpenses.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: `${currentMonth} Expenses`,
      value: `Rs. ${monthlyExpenses.toLocaleString()}`,
      icon: Calendar,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Pending Approvals',
      value: pendingExpenses.toString(),
      icon: Clock,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      change: '-5%',
      changeType: 'decrease'
    },
    {
      title: 'Average Expense',
      value: `Rs. ${averageExpense.toLocaleString()}`,
      icon: PieChart,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+3%',
      changeType: 'increase'
    }
  ];

  const handleViewReports = () => {
    const reportData = {
      totalTransactions: expenses.length,
      approvedExpenses: expenses.filter(e => e.status === 'approved').length,
      pendingExpenses: expenses.filter(e => e.status === 'pending').length,
      rejectedExpenses: expenses.filter(e => e.status === 'rejected').length,
      categoryBreakdown: categories.map(cat => ({
        name: cat.name,
        total: expenses.filter(e => e.category.id === cat.id).reduce((sum, e) => sum + e.amount, 0),
        count: expenses.filter(e => e.category.id === cat.id).length
      }))
    };
    
    setModalState({
      isOpen: true,
      type: 'reports',
      data: reportData
    });
  };

  const handleViewApprovals = () => {
    const pendingList = expenses.filter(e => e.status === 'pending');
    setModalState({
      isOpen: true,
      type: 'approvals',
      data: pendingList
    });
  };

  const handleViewSchedule = () => {
    const upcomingExpenses = expenses
      .filter(e => new Date(e.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 10);
    
    setModalState({
      isOpen: true,
      type: 'schedule',
      data: upcomingExpenses
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      data: null
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-600">Track your organization's financial activities</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const isIncrease = stat.changeType === 'increase';
          
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <IconComponent className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  isIncrease ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isIncrease ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={onAddExpense}
            className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 text-center group transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-lg">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">New Expense</p>
          </button>
          
          <button 
            onClick={handleViewReports}
            className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all duration-200 text-center group transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-lg">
              <PieChart className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">View Reports</p>
          </button>
          
          <button 
            onClick={handleViewApprovals}
            className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-all duration-200 text-center group transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-lg">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">Approvals</p>
          </button>
          
          <button 
            onClick={handleViewSchedule}
            className="p-4 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 transition-all duration-200 text-center group transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-lg">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">Schedule</p>
          </button>
        </div>
      </div>

      <NotificationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type!}
        data={modalState.data}
      />
    </div>
  );
};

export default Dashboard;