import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import TransactionsList from './components/TransactionsList';
import { Expense, Category } from './types';

const categories: Category[] = [
  { id: '1', name: 'Office Supplies', color: '#3B82F6', icon: 'Package' },
  { id: '2', name: 'Travel', color: '#10B981', icon: 'Plane' },
  { id: '3', name: 'Meals', color: '#F59E0B', icon: 'Coffee' },
  { id: '4', name: 'Marketing', color: '#EF4444', icon: 'Megaphone' },
  { id: '5', name: 'Utilities', color: '#8B5CF6', icon: 'Zap' },
  { id: '6', name: 'Software', color: '#06B6D4', icon: 'Monitor' },
];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      title: 'Office Supplies Purchase',
      amount: 2500,
      category: categories[0],
      date: '2024-01-15',
      description: 'Purchased stationery and office materials',
      status: 'approved'
    },
    {
      id: '2',
      title: 'Business Trip to Pokhara',
      amount: 8500,
      category: categories[1],
      date: '2024-01-14',
      description: 'Transportation and accommodation costs',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Team Lunch',
      amount: 3200,
      category: categories[2],
      date: '2024-01-13',
      description: 'Monthly team building lunch',
      status: 'approved'
    },
  ]);

  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
    setShowExpenseForm(false);
  };

  const handleAddExpense = () => {
    setShowExpenseForm(true);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const currentMonth = new Date().getMonth();
    return expenseDate.getMonth() === currentMonth;
  }).reduce((sum, expense) => sum + expense.amount, 0);

  const pendingExpenses = expenses.filter(expense => expense.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onAddExpense={handleAddExpense} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Dashboard 
          totalExpenses={totalExpenses}
          monthlyExpenses={monthlyExpenses}
          pendingExpenses={pendingExpenses}
          categories={categories}
          expenses={expenses}
          onAddExpense={handleAddExpense}
        />
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TransactionsList expenses={expenses} />
          </div>
          
          <div className="space-y-6">
            {showExpenseForm && (
              <ExpenseForm 
                categories={categories}
                onSubmit={addExpense}
                onCancel={() => setShowExpenseForm(false)}
              />
            )}
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map(category => {
                  const categoryExpenses = expenses.filter(e => e.category.id === category.id);
                  const categoryTotal = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
                  
                  return (
                    <div key={category.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        Rs. {categoryTotal.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;