<script lang="ts">
    import type { Question, TextareaQuestion } from "../form/form.js";
    import { QuestionType } from "../form/form.js";
    export let data : TextareaQuestion = {
        type: QuestionType.TEXTAREA,

        name: "Text Area Question",

        content: "text area?",

        required: false,
        
        min_length: 0,

        max_length: 1000,

        placeholder: "type here",

        default: "",

    };
</script>

<label for={data.name}>{data.content}</label>
<input type="text"
       max={data.max_length}
       min={data.min_length}
       placeholder={data.placeholder}
       required={data.required}
       bind:value={data.default}>
