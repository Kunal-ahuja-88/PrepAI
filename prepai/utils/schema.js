import { pgTable,serial,text,timestamp,varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResponse:text('jsonMockResponse').notNull(),
    jobPositon:varchar('jobPositon').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull()
})

export const UserAnswer = pgTable('userAnswer' , {
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt').notNull(),

})

export const scheduleNotifications = pgTable('scheduleNotifications' , {
    id: serial('id').primaryKey(),
    email : varchar('email').notNull(),
    notification_type : varchar('notificationType').notNull(),
    reminder_time :varchar('reminderTime').notNull(),
    interview_date : timestamp('interviewDate').notNull()
})