import type { Form } from '$lib/form';
import { QuestionType } from '$lib/form';

// TODO: Add more questions to cover all question types.
export const demoForm: Form = {
	id: 'demo_form_id',
	discordChannelID: '',
	startDate: '',
	endDate: null,
	questions: {
		data: [
			{
				type: QuestionType.BOOLEAN,
				name: 'Age Check',
				content: 'Are you over 18 years old?',
				required: false,
				value: true,
				style: 'checkbox'
			},
			{
				type: QuestionType.TEXT,
				name: 'FRQ',
				content: 'How do you feel about this form?',
				required: false,
				value: 'Sample Text'
			},
			{
				type: QuestionType.RADIO_GROUP,
				name: 'multiple choice',
				content: 'please pick one',
				required: false,
				allowCustomChoice: false,
				choices: ['choice 1', 'choice 2', 'choice 3', 'choice 4']
			},
			{
				type: QuestionType.COLOR,
				name: 'Color Question',
				content: 'Pick a color',
				required: false,
				value: '#000000'
			},
			{
				type: QuestionType.NUMBER,
				name: 'Number Question',
				content: 'Pick a number',
				required: false,
				min: 0,
				max: 100,
				placeholder: 'select a number'
			},
			{
				type: QuestionType.TEXTAREA,
				name: 'Text Area Question',
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
				content: 'Pick an option',
				options: [{ value: 'text', content: 'test' }]
			},
			{
				type: QuestionType.DATE,
				name: 'justDate',
				content: 'Pick a date (jk you can only pick today)',
				required: false,
				value: '2024-04-10',
				min: '2024-04-10',
				max: '2024-04-10'
			}
		]
	}
};
