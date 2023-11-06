<script lang="ts">
    import type { Form, QuestionList, Question, TextQuestion,  TextareaQuestion, CheckboxQuestion, ColorQuestion, SingleTextSelectQuestion, NumberQuestion  } from "../form/form.js";
    import { QuestionType } from "../form/form.js";
    
    // Placeholder for now before we start importing actual data

    let question_1 : CheckboxQuestion = {
        type: QuestionType.CHECKBOX,

        name: "Day of week",

        content: "What is the day of the week?",
        
        required: false,

        default: false
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

        {/if}
    {/each} 
</form>

<!-- 
    TO DO: 
    Create Components for each question type.
    create type script function to render the form to where each question is rendered based on its type. 
    style the form

-->
