<script lang="ts">
    import type { DateQuestion } from '../form/form.js';
    import { QuestionType } from '../form/form.js';

    export let data: DateQuestion = {
        type: QuestionType.DATE,

        name: 'Date Question',
        
        default: 0.00,

        min: 0.00,

        max: 24.00,

        content: '',

        required: false

    }
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<input
	type="date"
	required={data.required}
	min={data.min}
	max={data.max}
	bind:value={data.default}
/>
