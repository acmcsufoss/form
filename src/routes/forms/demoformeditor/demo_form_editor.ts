import type { Form } from '$lib/form';
import { QuestionType } from '$lib/form';

// TODO: Add more questions to cover all question types.
export const demoForm: Form = {
	id: 'demo_form_id',
	discordChannelID: '',
	permissions: {},
	startDate: '',
	endDate: null,
	questions: {
		data: [
			{
				type: QuestionType.BOOLEAN,
				name: 'Age Check',
				position: 0,
				content: 'Are you over 18 years old?',
				required: false,
				value: true,
				style: 'checkbox'
			},
			{
				type: QuestionType.TEXT,
				name: 'FRQ',
				position: 1,
				content: 'How do you feel about this form?',
				required: false,
				value: 'Sample Text'
			},
			{
				type: QuestionType.RADIO_GROUP,
				name: 'multiple choice',
				position: 2,
				content: 'please pick one',
				required: false,
				allowCustomChoice: false,
				choices: [
					{ content: 'choice 1', value: 'choice 1 value' },
					{ content: 'choice 2', value: 'choice 2 value' },
					{ content: 'choice 3', value: 'choice 3 value' }
				]
			},
			{
				type: QuestionType.COLOR,
				name: 'Color Question',
				position: 3,
				content: 'Pick a color',
				required: false,
				value: '#000000'
			},
			{
				type: QuestionType.NUMBER,
				name: 'Number Question',
				position: 4,
				content: 'Pick a number',
				required: false,
				min: 0,
				max: 100,
				placeholder: 'select a number'
			},
			{
				type: QuestionType.TEXTAREA,
				name: 'Text Area Question',
				position: 5,
				content: 'text area?',
				required: false,
				minLength: 0,
				maxLength: 1_000,
				placeholder: 'write here',
				value: ''
			},
			{
				type: QuestionType.SELECT,
				name: 'Select Question',
				position: 6,
				content: 'Pick an option',
				options: [{ value: 'text', content: 'test' }]
			},
			{
				type: QuestionType.DATE,
				name: 'justDate',
				position: 7,
				content: 'Pick a date (jk you can only pick today)',
				required: false,
				value: '2024-04-10',
				min: '2024-04-10',
				max: '2024-04-10'
			},
			{
				type: QuestionType.DATETIME,
				name: 'justDate',
				position: 8,
				content: 'Pick a date (jk you can only pick today)',
				required: false,
				value: '2024-04-10T11:11:11',
				min: '2024-04-10T11:11:11',
				max: '2024-04-10T11:11:11'
			},
			{
				type: QuestionType.TIME,
				name: 'just time',
				position: 9,
				content: 'just time',
				required: false,
				value: '11:11:11',
				min: '11:11:11',
				max: '11:11:11'
			},
			{
				type: QuestionType.AVAILABILITY,
				name: 'availability',
				position: 10,
				content: 'Availability Question?',
				required: false,
				value: [['2024-04-10T11:11:11', '2024-04-10T11:11:12']]
			}
		]
	}
};
