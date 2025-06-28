import React from 'react';
import { X, CheckCircle, Clock, Calendar, PieChart, TrendingUp } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'reports' | 'approvals' | 'schedule';
  data: any;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, type, data }) => {
  if (!isOpen) return null;

  const getModalContent = () => {
    switch (type) {
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl">
                <PieChart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Expense Reports</h3>
                <p className="text-gray-600">Comprehensive financial overview</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Transactions</p>
                    <p className="text-2xl font-bold text-blue-800">{data.totalTransactions}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Approved</p>
                    <p className="text-2xl font-bold text-green-800">{data.approvedExpenses}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-600">Pending</p>
                    <p className="text-2xl font-bold text-amber-800">{data.pendingExpenses}</p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-500" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-xl border border-red-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-800">{data.rejectedExpenses}</p>
                  </div>
                  <X className="h-8 w-8 text-red-500" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-3">Top Spending Categories</h4>
              <div className="space-y-2">
                {data.categoryBreakdown
                  .sort((a: any, b: any) => b.total - a.total)
                  .slice(0, 3)
                  .map((category: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm font-bold text-gray-900">Rs. {category.total.toLocaleString()}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case 'approvals':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Pending Approvals</h3>
                <p className="text-gray-600">{data.length} items awaiting review</p>
              </div>
            </div>

            {data.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-green-800 mb-2">All Caught Up!</h4>
                  <p className="text-green-600">No pending approvals at this time.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {data.map((expense: any, index: number) => (
                  <div key={index} className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{expense.title}</h4>
                        <p className="text-sm text-gray-600">{expense.description}</p>
                        <p className="text-xs text-amber-600 mt-1">{new Date(expense.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-amber-800">Rs. {expense.amount.toLocaleString()}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Upcoming Schedule</h3>
                <p className="text-gray-600">Future expenses and deadlines</p>
              </div>
            </div>

            {data.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-2xl">
                  <Calendar className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">No Upcoming Expenses</h4>
                  <p className="text-blue-600">Your schedule is clear for now.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {data.map((expense: any, index: number) => (
                  <div key={index} className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{expense.title}</h4>
                        <p className="text-sm text-gray-600">{expense.description}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Calendar className="h-3 w-3 text-rose-500" />
                          <p className="text-xs text-rose-600">{new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-rose-800">Rs. {expense.amount.toLocaleString()}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                          {expense.category.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-500">Live Data</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {getModalContent()}
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;