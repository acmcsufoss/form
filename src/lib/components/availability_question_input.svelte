<script lang="ts">
	import type { AvailablityQuestion } from '$lib/form/form';
	import { QuestionType } from '$lib/form/form';

    export let data: AvailablityQuestion = {
        type: QuestionType.AVAILABILITY,

        name: 'Availibility Question',

        required: false,

        content: 'choose',

        minStartDatetime: 0,

        maxDateRanges: 100,

        maxEndDatetime: 0,

    }
    </script>


<label class="Question-Header" for={data.name}>{data.content}</label>
<input
	type="date"
	required={data.required}
	bind:value={data.default}
/>
