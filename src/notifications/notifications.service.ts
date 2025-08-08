//# Servicio para orquestar creación y envío de notificaciones
import { pool } from '../config/database.config.js';

export interface NotificationPayload {
  userId: number;
  message: string;
  type: 'email' | 'sms' | 'push';
}

export const notificationsService = {
  async sendNotification(payload: NotificationPayload): Promise<void> {
    try {
      // Guardar la notificación en la base de datos
      const query = `
        INSERT INTO notifications (user_id, message, type, status)
        VALUES ($1, $2, $3, 'pending')
        RETURNING id
      `;
      const { rows } = await pool.query(query, [
        payload.userId,
        payload.message,
        payload.type
      ]);
      
      const notificationId = rows[0].id;
      
      // Aquí iría la lógica real de envío (email, SMS, etc.)
      // Por ahora simulamos el envío exitoso
      console.log(`Enviando notificación ${notificationId} a usuario ${payload.userId}: ${payload.message}`);
      
      // Actualizar estado a enviado
      await pool.query(
        'UPDATE notifications SET status = $1 WHERE id = $2',
        ['sent', notificationId]
      );
    } catch (error) {
      console.error('Error al enviar notificación:', error);
      // No lanzamos el error para no interrumpir el flujo principal
    }
  }
};