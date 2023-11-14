<script lang="ts">
    import type { Question, NumberQuestion } from "$lib/form/form";
    import { QuestionType } from "$lib/form/form";

    export let data : NumberQuestion = {
        type: QuestionType.NUMBER,

        name: "Defualt Number Question",

        content: "Defualt Number?",

        required: false,

        min: 0,

        max: 100,

        default: 0,

        placeholder: "Enter a number",

        step: 1,

    }
</script>

<label for={data.name}> {data.content} </label>
<input type="number" bind:value={data.default}> 