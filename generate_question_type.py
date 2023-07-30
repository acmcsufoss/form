import form.form
import json

json_enum = json.dumps(
    {
        question_type.name: question_type.value
        for question_type in form.form.QuestionType
    }
)

with open("static/question_type.json", "w") as f:
    f.write(json_enum)
