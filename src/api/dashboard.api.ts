// Client-side API wrapper for dashboard services
// This runs in the renderer process and communicates with main process via IPC

export interface DashboardStats {
  totalClients: number;
  totalDocuments: number;
  pendingTasks: number;
  urgentItems: number;
  clientsChange: string;
  documentsChange: string;
  tasksChange: string;
  urgentChange: string;
}

export interface ClientSummary {
  id: number;
  name: string;
  phone: string;
  totalDocuments: number;
  lastUpload: string | null;
  status: 'active' | 'inactive' | 'warning';
  missingDocs: string[];
  pendingTasks: number;
}

export interface DocumentTypeCount {
  name: string;
  count: number;
}

export interface UploadTrend {
  date: string;
  count: number;
}

class DashboardAPI {
  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<DashboardStats> {
    // For now, return mock data until we implement IPC
    return {
      totalClients: 0,
      totalDocuments: 0,
      pendingTasks: 0,
      urgentItems: 0,
      clientsChange: '+0%',
      documentsChange: '+0%',
      tasksChange: '+0%',
      urgentChange: '+0',
    };
  }

  /**
   * Get client summaries
   */
  async getClientSummaries(limit: number = 10): Promise<ClientSummary[]> {
    // Return empty array for now
    return [];
  }

  /**
   * Get document counts by type
   */
  async getDocumentCountsByType(): Promise<DocumentTypeCount[]> {
    // Return sample data
    return [
      { name: 'Invoice', count: 0 },
      { name: 'TDS Certificate', count: 0 },
      { name: 'GST Return', count: 0 },
      { name: 'Bank Statement', count: 0 },
      { name: 'Other', count: 0 },
    ];
  }

  /**
   * Get upload trends
   */
  async getUploadTrends(days: number = 7): Promise<UploadTrend[]> {
    // Generate last 7 days with 0 counts
    const trends: UploadTrend[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      trends.push({
        date: date.toISOString().split('T')[0],
        count: 0,
      });
    }

    return trends;
  }
}

export const dashboardAPI = new DashboardAPI();
