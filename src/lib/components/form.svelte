<script lang="ts">
    import type { Form, QuestionList, Question, TextQuestion,  TextareaQuestion, CheckboxQuestion, ColorQuestion, SingleTextSelectQuestion, NumberQuestion  } from "../form/form.js";
    import { QuestionType } from "../form/form.js";
    import CheckboxQuestionInput from "./checkbox_question_input.svelte";
    import TextQuestionInput from "./text_question_input.svelte";
    import SingleTextSelectQuestionInput from "./singletextselect_question_input.svelte";
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
    let question_3 : SingleTextSelectQuestion = {
        type: QuestionType.SINGLE_TEXT_SELECT,

        name: "multiple choice",

        content: "please pick one",

        required: false,

        custom_choice: false,

        choices: ["choice 1", "choice 2", "choice 3", "choice 4"],

        default_choice: 0
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
        {#if question.type === QuestionType.CHECKBOX}
            <CheckboxQuestionInput data={question}/>
        {:else if question.type === QuestionType.TEXT}
            <TextQuestionInput data={question}/>
        {:else if question.type === QuestionType.SINGLE_TEXT_SELECT}
            <SingleTextSelectQuestionInput data={question}/>
           {/if}
           <br>
    {/each} 
</form>

<!-- 
    TO DO: 
    Create Components for each question type.
    create type script function to render the form to where each question is rendered based on its type. 
    style the form

-->
