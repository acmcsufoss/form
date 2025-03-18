import { z } from 'zod';

/**
 * IDSchema is a Zod schema that validates a string.
 */
export const IDSchema = z.string();

/**
 * Timestamp is a Zod schema that validates a string.
 * It is used to represent a timestamp.
 */
export const TimestampSchema = z.string();

/**
 * QuestionValue is the value of a question.
 */
// export const QuestionValueSchema = z.union([]);

/**
 * QuestionTypeSchema is the type of question.
 */

// export const QuestionTypeSchema = z.;
export const QuestionTypeSchema = z.enum([
	'number',
	'radio_group',
	'text',
	'textarea',
	'boolean',
	'color',
	'date',
	'time',
	'datetime',
	'availability',
	'timezone',
	'select'
]);

/**
 * NumberSchema is a Zod schema that converts a string to a number with validation.
 * Or returns the value as is if it is already a number.
 */

export const QuestionBaseSchema = z.object({
	/**
	 * type is the type of question.
	 */
	type: QuestionTypeSchema,

	/**
	 * name is the name of the question.
	 */
	name: z.string(),

	/**
	 * content is the markdown question content for the form field.
	 */
	content: z.string(),

	/**
	 * position is the position of the question in the form.
	 */
	position: z.coerce.number(),

	/**
	 * disabled is whether or not the form field is disabled.
	 */
	disabled: z.coerce.boolean().optional(),

	/**
	 * required is whether or not the form field is required.
	 *
	 * By default, form fields are not required.
	 */
	required: z.coerce.boolean().optional()
});

export const QuestionValueBaseSchema = z.object({
	/**
	 * type is the type of question.
	 */
	type: QuestionTypeSchema,

	/**
	 * name is the name of the question.
	 */
	name: z.string()
});

export const RadioGroupQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('radio_group'),

	/**
	 * choices is the list of choices for the question.
	 *
	 * TODO: Update to choices: { value: string; content: string; }[].
	 * This will allow for custom choice values. Replace choiceIndex with value.
	 */
	choices: z.array(
		z.object({
			value: z.string().optional(),
			content: z.string().optional()
		})
	),

	/**
	 * allowCustomChoice is whether or not the form field has a custom choice.
	 *
	 * By default, custom choices are not allowed.
	 */
	allowCustomChoice: z.coerce.boolean().optional(),

	/**
	 * choiceIndex is the value choice index for the question.
	 */
	choiceIndex: z.coerce.number().optional(),

	/**
	 * customChoice is the value custom choice for the form field.
	 *
	 * The custom choice is only used if allowCustomChoice is true.
	 */
	customChoice: z.string().optional(),

	/**
	 * value is the default value for the question.
	 */
	value: z.string().optional()
});

export const RadioGroupQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('radio_group'),

	/**
	 * value is the value of the question.
	 */
	value: z.string()
});

export const NumberQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('number'),

	/**
	 * min is the minimum value for the number.
	 */
	min: z.coerce.number().optional(),

	/**
	 * max is the maximum value for the number.
	 */
	max: z.coerce.number().optional(),

	/**
	 * step is the step value for the number.
	 */
	step: z.coerce.number().optional(),

	/**
	 * value is the value for the number.
	 */
	value: z.coerce.number().optional(),

	/**
	 * placeholder is the placeholder value for the number.
	 */
	placeholder: z.string().optional()
});

export const NumberQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('number'),

	/**
	 * value is the value of the question.
	 */
	value: z.coerce.number()
});

export const TextQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('text'),

	/**
	 * minLength is the minimum length for the text.
	 */
	minLength: z.coerce.number().optional(),

	/**
	 * maxLength is the maximum length for the text.
	 */
	maxLength: z.coerce.number().optional(),

	/**
	 * value is the value for the text.
	 */
	value: z.string().optional(),

	/**
	 * placeholder is the placeholder value for the text;
	 */
	placeholder: z.string().optional(),

	/**
	 * pattern is the regex pattern for the text.
	 */
	pattern: z.string().optional(),

	/**
	 * choices is the list of suggestions for the text.
	 */
	choices: z.array(z.string()).optional()
});

export const TextQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('text'),

	/**
	 * value is the value of the question.
	 */
	value: z.string()
});

export const TextareaQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('textarea'),

	/**
	 * minLength is the minimum length for the text.
	 */
	minLength: z.coerce.number().optional(),

	/**
	 * maxLength is the maximum length for the text.
	 */
	maxLength: z.coerce.number().optional(),

	/**
	 * value is the value for the text.
	 */
	value: z.string().optional(),

	/**
	 * placeholder is the placeholder value for the text;
	 */
	placeholder: z.string().optional()
});

export const TextareaQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('textarea'),

	/**
	 * value is the value of the question.
	 */
	value: z.string()
});

export const BooleanQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('boolean'),

	/**
	 * style is the style of the boolean question. Defaults to checkbox.
	 */
	style: z.union([z.literal('checkbox'), z.literal('radio')]).optional(),

	/**
	 * value is the value for the boolean question.
	 */
	value: z.coerce.boolean().optional()
});

export const BooleanQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('boolean'),

	/**
	 * value is the value of the question.
	 */
	value: z.coerce.boolean()
});

export const ColorQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('color'),

	/**
	 * value is the value for the color.
	 */
	value: z.string().optional()
});

export const ColorQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('color'),

	/**
	 * value is the value of the question.
	 */
	value: z.string()
});

export const DateQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('date'),

	/**
	 * value is the value for the date.
	 */
	value: TimestampSchema.optional(),

	/**
	 * min is the minimum value for the date input.
	 */
	min: TimestampSchema.optional(),

	/**
	 * max is the maximum value for the date input.
	 */
	max: TimestampSchema.optional()
});

export const DateQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('date'),

	/**
	 * value is the value of the question.
	 */
	value: TimestampSchema
});

export const TimeQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('time'),

	/**
	 * value is the value for the time.
	 */
	value: TimestampSchema.optional(),

	/**
	 * min is the minimum value for the time input.
	 */
	min: TimestampSchema.optional(),

	/**
	 * max is the maximum value for the time input.
	 */
	max: TimestampSchema.optional()
});

export const TimeQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('time'),

	/**
	 * value is the value of the question.
	 */
	value: TimestampSchema
});

export const DatetimeQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('datetime'),

	/**
	 * value is the value for the datetime.
	 */
	value: TimestampSchema.optional(),

	/**
	 * min is the minimum value for the datetime input.
	 */
	min: TimestampSchema.optional(),

	/**
	 * max is the maximum value for the datetime input.
	 */
	max: TimestampSchema.optional()
});

export const DatetimeQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('datetime'),

	/**
	 * value is the value of the question.
	 */
	value: TimestampSchema
});

export const AvailabilityQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('availability'),

	/**
	 * value is the value for the availability.
	 */
	value: z.array(z.tuple([TimestampSchema, TimestampSchema])).optional(),

	/**
	 * minStartDatetime is the minimum start date for the availability question.
	 */
	minStartDatetime: TimestampSchema.optional(),

	/**
	 * maxEndDatetime is the maximum start date for the availability question.
	 */
	maxEndDatetime: TimestampSchema.optional(),

	/**
	 *maxDatetimeRanges is the number of date input pairs that the user can enter.
	 */
	maxDatetimeRanges: z.coerce.number().optional()
});

export const AvailabilityQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('availability'),

	/**
	 * value is the value of the question.
	 */
	value: z.array(z.tuple([TimestampSchema, TimestampSchema]))
});

export const TimezoneQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('timezone'),

	/**
	 * value is the value for the timezone.
	 */
	value: z.string().optional()
});

export const TimezoneQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('timezone'),

	/**
	 * value is the value of the question.
	 */
	value: z.string()
});

export const SelectQuestionSchema = QuestionBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('select'),

	/**
	 * options is the list of options for the select question.
	 */
	options: z.array(
		z.object({
			value: z.string().optional(),
			content: z.string().optional()
		})
	),

	value: z.string().optional()
});

export const SelectQuestionValueSchema = QuestionValueBaseSchema.extend({
	/**
	 * type is the type of question.
	 */
	type: z.literal('select'),

	/**
	 * value is the value of the question.
	 */
	value: z.string()
});

export const QuestionSchema = z.discriminatedUnion('type', [
	BooleanQuestionSchema,
	RadioGroupQuestionSchema,
	NumberQuestionSchema,
	TextQuestionSchema,
	TextareaQuestionSchema,
	ColorQuestionSchema,
	DateQuestionSchema,
	TimeQuestionSchema,
	DatetimeQuestionSchema,
	AvailabilityQuestionSchema,
	TimezoneQuestionSchema,
	SelectQuestionSchema
]);

export const QuestionValueSchema = z.discriminatedUnion('type', [
	BooleanQuestionValueSchema,
	RadioGroupQuestionValueSchema,
	NumberQuestionValueSchema,
	TextQuestionValueSchema,
	TextareaQuestionValueSchema,
	ColorQuestionValueSchema,
	DateQuestionValueSchema,
	TimeQuestionValueSchema,
	DatetimeQuestionValueSchema,
	AvailabilityQuestionValueSchema,
	TimezoneQuestionValueSchema,
	SelectQuestionValueSchema
]);

export const QuestionListSchema = z.object({
	/**
	 * data is the list of questions.
	 */
	data: z.array(QuestionSchema),

	/**
	 * shuffled is whether or not the questions are shuffled.
	 */
	shuffled: z.coerce.boolean().optional()
});

export const FormSchema = z.object({
	/**
	 *  id is the form ID.
	 */
	id: IDSchema,

	/**
	 * permissions is the permissions data for the form.
	 *
	 * Status: Future work.
	 */
	// permissions: FormPermissions;

	/**
	 * title is the title of the form.
	 */
	title: z.string().optional(),

	/**
	 * description is the markdown description of the form. This is displayed
	 * in the Discord message.
	 */
	description: z.string().optional(),

	/**
	 * questions is the list of questions for the form.
	 */
	questions: QuestionListSchema,

	/**
	 * questions is the list of questions for the form.
	 */
	// questions: QuestionList;

	/**
	 * discordMessageID is the ID of the Discord message that the form is linked to (if any).
	 */
	discordMessageId: z.string().optional(),

	/**
	 * discordChannelID is the ID of the Discord channel that the message is in.
	 */
	discordChannelId: z.string().optional(),

	/**
	 * discordThreadID is the ID of the Discord thread that the message is in.
	 */
	discordThreadID: z.string().optional(),

	/**
	 * startDate is the start time for the form.
	 *
	 * This is also the time that the form will be posted to Discord.
	 */
	startDate: TimestampSchema.nullable(),

	/**
	 * endDate is the end time for the form.
	 *
	 * This is when the form will be closed and may be edited.
	 */
	endDate: TimestampSchema.nullable(),

	/**
	 * timezone is the timezone ID for the form. Defaults to UTC/GMT.
	 */
	timezone: z.string().optional(),

	/**
	 * allowsMultipleSubmissions is whether or not the form allows multiple
	 * submissions. Defaults to false.
	 */
	allowsMultipleSubmissions: z.coerce.boolean().optional(),

	/**
	 * anonymized is whether or not the form's submissions are anonymized.
	 *
	 * Defaults to false.
	 */
	anonymized: z.coerce.boolean().optional()
});
