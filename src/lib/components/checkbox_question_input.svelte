
<script lang="ts">
    import type { Question, CheckboxQuestion } from "../form/form.js";
    import { QuestionType } from "../form/form.js";
    export let data : CheckboxQuestion = {
        type: QuestionType.CHECKBOX,

        name: "Default Question",

        content: "Default?",
        
        required: false,

        default: false,
    };
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<input type="checkbox" required={data.required} bind:checked={data.default}>