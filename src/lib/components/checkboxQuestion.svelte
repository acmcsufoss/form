
<script lang="ts">
    import type { Question, CheckboxQuestion } from "../form/form.js";
    export let temp_question : CheckboxQuestion;
</script>

<label for={temp_question.name}>{temp_question.content}</label>
<input type="checkbox" bind:checked={temp_question.default}>