module.exports = {
  ROLES: {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    CLIENT: 'client'
  },

  PROJECT_STATUS: {
    ON_TRACK: 'on_track',
    AT_RISK: 'at_risk',
    CRITICAL: 'critical',
    COMPLETED: 'completed'
  },

  RISK_SEVERITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
  },

  HEALTH_SCORE_RANGES: {
    ON_TRACK: { min: 80, max: 100 },
    AT_RISK: { min: 60, max: 79 },
    CRITICAL: { min: 0, max: 59 }
  },

  WEEKDAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

  EMAIL_TEMPLATES: {
    WELCOME: 'welcome',
    CHECKIN_REMINDER: 'checkin_reminder',
    FEEDBACK_REMINDER: 'feedback_reminder',
    PROJECT_UPDATE: 'project_update'
  }
};