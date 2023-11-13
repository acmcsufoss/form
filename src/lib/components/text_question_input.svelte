
<script lang="ts">
import type { Question, TextQuestion } from "../form/form.js";
import { QuestionType } from "../form/form.js";
export let data : TextQuestion = {    

      type: QuestionType.TEXT,

      name: "TextQuestion Question",

      content: "Text?",

      required: false,

      min_length: 0,
  
      max_length: 100,

      default: "",
   
      placeholder: "type here",

      pattern: "",

};
</script>

<label for={data.name}>{data.content}</label>
<input type="text" 
maxlength={data.max_length}
minlength={data.max_length}
placeholder={data.placeholder}
bind:value={data.default}>
