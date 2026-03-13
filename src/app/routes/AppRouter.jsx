import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppProviders from '../providers/AppProviders'
import AppShell from '../layout/AppShell'
import ProtectedRoute from './ProtectedRoute'
import AiPrioritizationPage from '../../pages/AiPrioritizationPage'
import AnalyticsPage from '../../pages/AnalyticsPage'
import DashboardPage from '../../pages/DashboardPage'
import DeveloperTasksPage from '../../pages/DeveloperTasksPage'
import LoginPage from '../../pages/LoginPage'
import ManagerOverviewPage from '../../pages/ManagerOverviewPage'
import NotFoundPage from '../../pages/NotFoundPage'
import TaskDetailPage from '../../pages/TaskDetailPage'
import TelegramIntegrationPage from '../../pages/TelegramIntegrationPage'

export default function AppRouter() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            element={(
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            )}
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/developer/tasks" element={<DeveloperTasksPage />} />
            <Route path="/manager/overview" element={<ManagerOverviewPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/telegram" element={<TelegramIntegrationPage />} />
            <Route path="/ai-prioritization" element={<AiPrioritizationPage />} />
            <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  )
}
