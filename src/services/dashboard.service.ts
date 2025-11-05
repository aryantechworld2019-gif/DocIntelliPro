import { db } from '../db';
import { clients, documents, tasks, communications, documentTypes } from '../db/schema';
import { eq, sql, and, gte, count, desc } from 'drizzle-orm';
import { logger } from '../lib/logger';

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

export interface ActivityData {
  clientId: number;
  clientName: string;
  lastActive: string;
  documentsThisWeek: number;
  documentsThisMonth: number;
  status: 'active' | 'inactive';
}

class DashboardService {
  /**
   * Get main dashboard statistics
   */
  async getStats(): Promise<DashboardStats> {
    try {
      // Get current counts
      const [clientCount] = await db.select({ count: count() }).from(clients);
      const [documentCount] = await db.select({ count: count() }).from(documents);
      const [pendingTaskCount] = await db
        .select({ count: count() })
        .from(tasks)
        .where(eq(tasks.status, 'pending'));
      const [urgentTaskCount] = await db
        .select({ count: count() })
        .from(tasks)
        .where(
          and(
            eq(tasks.status, 'pending'),
            sql`${tasks.priority} IN ('high', 'urgent')`
          )
        );

      // Calculate changes (for now, mock percentages - would need historical data)
      return {
        totalClients: clientCount.count,
        totalDocuments: documentCount.count,
        pendingTasks: pendingTaskCount.count,
        urgentItems: urgentTaskCount.count,
        clientsChange: '+12%',
        documentsChange: '+23%',
        tasksChange: '-5%',
        urgentChange: '+2',
      };
    } catch (error) {
      logger.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  /**
   * Get client summary cards with all details
   */
  async getClientSummaries(limit: number = 10): Promise<ClientSummary[]> {
    try {
      const allClients = await db.select().from(clients).limit(limit);

      const summaries: ClientSummary[] = [];

      for (const client of allClients) {
        // Get document count
        const [docCount] = await db
          .select({ count: count() })
          .from(documents)
          .where(eq(documents.clientId, client.id));

        // Get last upload date
        const [lastDoc] = await db
          .select({ createdAt: documents.createdAt })
          .from(documents)
          .where(eq(documents.clientId, client.id))
          .orderBy(desc(documents.createdAt))
          .limit(1);

        // Get pending tasks
        const [taskCount] = await db
          .select({ count: count() })
          .from(tasks)
          .where(
            and(
              eq(tasks.clientId, client.id),
              eq(tasks.status, 'pending')
            )
          );

        // Get mandatory document types
        const mandatoryTypes = await db
          .select()
          .from(documentTypes)
          .where(eq(documentTypes.isMandatory, true));

        // Check which mandatory docs are missing
        const clientDocs = await db
          .select({ documentTypeId: documents.documentTypeId })
          .from(documents)
          .where(eq(documents.clientId, client.id));

        const clientDocTypeIds = clientDocs
          .map((d) => d.documentTypeId)
          .filter((id): id is number => id !== null);

        const missingDocs = mandatoryTypes
          .filter((type) => !clientDocTypeIds.includes(type.id))
          .map((type) => type.name);

        // Determine status based on activity
        let status: 'active' | 'inactive' | 'warning' = 'inactive';
        if (lastDoc) {
          const daysSinceUpload = Math.floor(
            (Date.now() - new Date(lastDoc.createdAt).getTime()) / (1000 * 60 * 60 * 24)
          );
          if (daysSinceUpload <= 7) status = 'active';
          else if (daysSinceUpload <= 30) status = 'warning';
        }

        summaries.push({
          id: client.id,
          name: client.name,
          phone: client.phone,
          totalDocuments: docCount.count,
          lastUpload: lastDoc?.createdAt || null,
          status,
          missingDocs,
          pendingTasks: taskCount.count,
        });
      }

      return summaries;
    } catch (error) {
      logger.error('Error fetching client summaries:', error);
      throw error;
    }
  }

  /**
   * Get document counts by type
   */
  async getDocumentCountsByType(): Promise<DocumentTypeCount[]> {
    try {
      const results = await db
        .select({
          typeId: documents.documentTypeId,
          count: count(),
        })
        .from(documents)
        .groupBy(documents.documentTypeId);

      const countsWithNames: DocumentTypeCount[] = [];

      for (const result of results) {
        if (result.typeId) {
          const [docType] = await db
            .select()
            .from(documentTypes)
            .where(eq(documentTypes.id, result.typeId))
            .limit(1);

          countsWithNames.push({
            name: docType?.name || 'Unknown',
            count: result.count,
          });
        } else {
          countsWithNames.push({
            name: 'Unclassified',
            count: result.count,
          });
        }
      }

      return countsWithNames.sort((a, b) => b.count - a.count);
    } catch (error) {
      logger.error('Error fetching document counts by type:', error);
      throw error;
    }
  }

  /**
   * Get upload trends for the last 7 days
   */
  async getUploadTrends(days: number = 7): Promise<UploadTrend[]> {
    try {
      const trends: UploadTrend[] = [];
      const today = new Date();

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);

        const [result] = await db
          .select({ count: count() })
          .from(documents)
          .where(
            and(
              gte(documents.createdAt, date.toISOString()),
              sql`${documents.createdAt} < ${nextDate.toISOString()}`
            )
          );

        trends.push({
          date: date.toISOString().split('T')[0],
          count: result.count,
        });
      }

      return trends;
    } catch (error) {
      logger.error('Error fetching upload trends:', error);
      throw error;
    }
  }

  /**
   * Get client activity data
   */
  async getClientActivity(): Promise<ActivityData[]> {
    try {
      const allClients = await db.select().from(clients);
      const activities: ActivityData[] = [];

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

      for (const client of allClients) {
        // Get last activity
        const [lastDoc] = await db
          .select({ createdAt: documents.createdAt })
          .from(documents)
          .where(eq(documents.clientId, client.id))
          .orderBy(desc(documents.createdAt))
          .limit(1);

        // Count documents this week
        const [weekCount] = await db
          .select({ count: count() })
          .from(documents)
          .where(
            and(
              eq(documents.clientId, client.id),
              gte(documents.createdAt, oneWeekAgo.toISOString())
            )
          );

        // Count documents this month
        const [monthCount] = await db
          .select({ count: count() })
          .from(documents)
          .where(
            and(
              eq(documents.clientId, client.id),
              gte(documents.createdAt, oneMonthAgo.toISOString())
            )
          );

        activities.push({
          clientId: client.id,
          clientName: client.name,
          lastActive: lastDoc?.createdAt || 'Never',
          documentsThisWeek: weekCount.count,
          documentsThisMonth: monthCount.count,
          status: weekCount.count > 0 ? 'active' : 'inactive',
        });
      }

      return activities.sort((a, b) => b.documentsThisWeek - a.documentsThisWeek);
    } catch (error) {
      logger.error('Error fetching client activity:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();
