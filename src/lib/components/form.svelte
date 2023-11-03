<script lang="ts">
    import type { Form } from "../form/form.ts";
    import type { QuestionList } from "../form/form.ts";
    import type { Question } from "../form/form.ts";
    import { QuestionType } from "../form/form.js";
    
    // Placeholder for now before we start importing actual data

    let question_1 : Question = {
        type: QuestionType.CHECKBOX,

        name: "Day of week",

        content: "What is the day of the week?",
        
        required: false
    }
    let question_2 : Question = {
        type: QuestionType.TEXT,

        name: "FRQ",

        content: "How do you feel about this form?",

        required: false
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


<!-- Dont use div here use form html thingy -->
<div>
    {#each questionList.data as question}
        <h2> {question.name}</h2>
        <p> {question.content}</p>
        
    {/each} 
</div>

<!-- 
    TO DO: 
    Create Components for each question type.
    create type script function to render the form to where each question is rendered based on its type. 
    style the form

-->
