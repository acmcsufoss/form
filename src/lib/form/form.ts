import * as formSchema from './formSchema';
import { z } from 'zod';

/**
 * ID is a unique identifier.
 */
export type ID = z.infer<typeof formSchema.IDSchema>;

/**
 * Timestamp is a local timestamp. A date is represented as a string
 * in the format YYYY-MM-DD. A datetime is represented as a string in the
 * format YYYY-MM-DDTHH:MM:SS.
 */
export type Timestamp = z.infer<typeof formSchema.TimestampSchema>;

/**
 * Form is a form.
 */
export type Form = z.infer<typeof formSchema.FormSchema>;

/**
 * Question is a component of a form.
 */
export type Question = z.infer<typeof formSchema.QuestionSchema>;

/**
 * QuestionValue is the value of a question.
 */
export type QuestionValue = z.infer<typeof formSchema.QuestionValueSchema>;

/**
 * QuestionList is a list of questions.
 */
export type QuestionList = z.infer<typeof formSchema.QuestionListSchema>;

/**
 * QuestionType is the type of question.
 */
export enum QuestionType {
	NUMBER = 'number',
	RADIO_GROUP = 'radio_group',
	TEXT = 'text',
	TEXTAREA = 'textarea',
	BOOLEAN = 'boolean',
	COLOR = 'color',
	DATE = 'date',
	TIME = 'time',
	DATETIME = 'datetime',
	AVAILABILITY = 'availability',
	TIMEZONE = 'timezone',
	SELECT = 'select'
}

/**
 * QuestionBase is the base for all questions.
 */
export type QuestionBase = z.infer<typeof formSchema.QuestionBaseSchema>;

/**
 * QuestionValueBase is the base for all question values.
 */
export type QuestionValueBase = z.infer<typeof formSchema.QuestionValueBaseSchema>;

export type BooleanQuestion = z.infer<typeof formSchema.BooleanQuestionSchema>;

export type BooleanQuestionValue = z.infer<typeof formSchema.BooleanQuestionValueSchema>;

export type RadioGroupQuestion = z.infer<typeof formSchema.RadioGroupQuestionSchema>;

export type RadioGroupQuestionValue = z.infer<typeof formSchema.RadioGroupQuestionValueSchema>;

export type NumberQuestion = z.infer<typeof formSchema.NumberQuestionSchema>;

export type NumberQuestionValue = z.infer<typeof formSchema.NumberQuestionValueSchema>;

export type TextQuestion = z.infer<typeof formSchema.TextQuestionSchema>;

export type TextQuestionValue = z.infer<typeof formSchema.TextQuestionValueSchema>;

export type TextareaQuestion = z.infer<typeof formSchema.TextareaQuestionSchema>;

export type TextareaQuestionValue = z.infer<typeof formSchema.TextareaQuestionValueSchema>;

export type ColorQuestion = z.infer<typeof formSchema.ColorQuestionSchema>;

export type ColorQuestionValue = z.infer<typeof formSchema.ColorQuestionValueSchema>;

export type DateQuestion = z.infer<typeof formSchema.DateQuestionSchema>;

export type DateQuestionValue = z.infer<typeof formSchema.DateQuestionValueSchema>;

export type TimeQuestion = z.infer<typeof formSchema.TimeQuestionSchema>;

export type TimeQuestionValue = z.infer<typeof formSchema.TimeQuestionValueSchema>;

export type DatetimeQuestion = z.infer<typeof formSchema.DatetimeQuestionSchema>;

export type DatetimeQuestionValue = z.infer<typeof formSchema.DatetimeQuestionValueSchema>;

export const DEFAULT_MAX_DATE_RANGES = 1;

export type AvailabilityQuestion = z.infer<typeof formSchema.AvailabilityQuestionSchema>;

export type AvailabilityQuestionValue = z.infer<typeof formSchema.AvailabilityQuestionValueSchema>;

export type TimezoneQuestion = z.infer<typeof formSchema.TimezoneQuestionSchema>;

export type TimezoneQuestionValue = z.infer<typeof formSchema.TimezoneQuestionValueSchema>;

export type SelectQuestion = z.infer<typeof formSchema.SelectQuestionSchema>;

export type SelectQuestionValue = z.infer<typeof formSchema.SelectQuestionValueSchema>;
