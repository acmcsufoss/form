
<script lang="ts">
    import type { Question, SingleTextSelectQuestion } from "../form/form.js";
    import { QuestionType } from "../form/form.js";
    export let data : SingleTextSelectQuestion = {

        type: QuestionType.SINGLE_TEXT_SELECT,

        name: "SingleTextSelect Question",

        content: "Select One",

        required: false,

        choices: ["","",""],

        custom_choice: true,

        default_choice: 0,

        default_custom_choice: "",
    }
</script>

<label for={data.name}>{data.content}</label>
<br>
<!-- TODO: Create functionality for defualt choice and custom choice -->
{#each data.choices as choice}
    <input type="radio" required={data.required} name={data.name} id={choice}/>
    <label for={choice}>{choice}</label>
{/each}