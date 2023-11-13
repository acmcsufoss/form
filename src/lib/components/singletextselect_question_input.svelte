
<script lang="ts">
    import type { Question, SingleTextSelectQuestion } from "../form/form.js";
    import { QuestionType } from "../form/form.js";
    export let data : SingleTextSelectQuestion = {

        type: QuestionType.SINGLE_TEXT_SELECT,

        name: "SingleTextSelect",

        content: "Select One",

        required: false,

        choices: ["","",""],

        custom_choice: true,

        default_choice: 0,

        default_custom_choice: "",
    }
</script>

<label for={data.name}>{data.content}</label>
{#each data.choices as choice}
<input type="radio" id={choice}><input/>
<label for="{choice}"> {choice}</label>

    
{/each}