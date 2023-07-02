from flask import Flask, request, jsonify, redirect

app = Flask(__name__)


@app.route("/forms", methods=["GET"])
def list_forms():
    forms = [{"id": "form1", "title": "Form 1"}, {"id": "form2", "title": "Form 2"}]
    return jsonify(forms)


@app.route("/forms", methods=["POST"])
def generate_form():
    return redirect("/forms/new", code=302)


@app.route("/forms/<form_id>", methods=["GET"])
def edit_form(form_id):
    return "HTML form edit page"


@app.route("/forms/<form_id>", methods=["POST"])
def update_form(form_id):
    form_update = request.get_json()
    # Process the form update
    return "", 200


@app.route("/<response_id>", methods=["POST"])
def submit_form(response_id):
    form_response = request.get_json()
    # Process the form response
    return redirect("/success?response_id=" + response_id, code=302)

# TODO: Add endpoint for saving draft.

# TODO: Add endpoint for submitting at a later date.

@app.route("/success", methods=["GET"])
def success_page():
    return "HTML success page"


if __name__ == "__main__":
    app.run(port=8000)

# https://flask.palletsprojects.com/en/2.3.x/quickstart/
