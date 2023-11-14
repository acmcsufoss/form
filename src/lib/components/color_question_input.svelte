<script lang="ts">
    import type { Question, ColorQuestion } from "$lib/form/form";
    import { QuestionType } from "$lib/form/form";
    export let data : ColorQuestion = {
        type: QuestionType.COLOR,

        name: "Default Color Question",

        content: "Default Pick a color",

        required: false,

        default: "red"
    }
</script>


<label for={data.name}>{data.content}</label>
<input type="color" bind:value={data.default}/>