<script lang="ts">
    import type { Form, QuestionList, Question, TextQuestion,  TextareaQuestion, CheckboxQuestion, ColorQuestion, SingleTextSelectQuestion, NumberQuestion  } from "../form/form.js";
    import { QuestionType } from "../form/form.js";
    import CheckboxQuestion from "./CheckboxQuestion.svelte";
    // Placeholder for now before we start importing actual data

    let question_1 : CheckboxQuestion = {
        type: QuestionType.CHECKBOX,

        name: "Age Check",

        content: "Are you over 18 years old?",
        
        required: false,

        default: true
    }
    let question_2 : TextQuestion = {
        type: QuestionType.TEXT,

        name: "FRQ",

        content: "How do you feel about this form?",

        required: false,

        default: "Sample Text"
    }

    let questionList: QuestionList = {
        data: [question_1, question_2],

        shuffled: false
    }

    let currentForm: Form = {
        id : "20",

        questions: questionList
    }
    
</script>


<form action="">
    {#each questionList.data as question}
        {#if question.type == QuestionType.CHECKBOX}
            <CheckboxQuestion temp_question = {question}/>
        {/if}
    {/each} 
</form>

<!-- 
    TO DO: 
    Create Components for each question type.
    create type script function to render the form to where each question is rendered based on its type. 
    style the form

-->
