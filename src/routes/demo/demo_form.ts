import type { Form } from '$lib/form';
import { QuestionType } from '$lib/form';

// TODO: Add more questions to cover all question types.
export const demoForm: Form = {
	id: 'demo_form_id',
	title: 'Demo form',
	description: 'testing for user side form features',
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
				choices: [
					{ value: 'choice1', content: 'choice 1' },
					{ value: 'choice2', content: 'choice 2' },
					{ value: 'choice3', content: 'choice 3' },
					{ value: 'choice4', content: 'choice 4' }
				]
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
				content: 'select one',
				required: false,
				options: [
					{ value: 'option 1', content: 'option 1' },
					{ value: 'option 2', content: 'option 2' },
					{ value: 'option 3', content: 'option 3' }
				]
			}
		]
	}
};
