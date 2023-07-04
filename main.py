from flask import Flask, request, redirect, render_template
from form.form import Form
from form.pickle_form_database import PickleFormDatabase
from response.pickle_response_database import PickleResponseDatabase


app = Flask(__name__)
form_db = PickleFormDatabase("forms.pkl")
response_db = PickleResponseDatabase("responses.pkl")

@app.route("/forms", methods=["GET"])
def new_form_page():
    new_form = Form()
    form_db.save_form(new_form)
    return redirect(f"/forms/{new_form.id}", code=302)


@app.route("/forms/<form_id>", methods=["GET"])
def edit_form_page(form_id: str):
    form = form_db.get_form(form_id)
    return render_template("form.html", form=form)


@app.route("/forms/<form_id>", methods=["POST"])
def edit_form(form_id: str):
    form_update = request.get_json()
    # Process the form update
    return "", 200


@app.route("/<response_id>", methods=["GET"])
def respond_form_page(response_id: str):
    # Get the form by ID
    # Render the form

@app.route("/<response_id>", methods=["POST"])
def respond_form(response_id: str):
    # Get the form by ID
    # Render the form

@app.route("/<response_id>", methods=["POST"])
def submit_form(response_id: str):
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
