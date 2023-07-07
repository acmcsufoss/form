from flask import Flask, request, redirect
import form.form
import html_util
import form.pickle_form_database
import response.pickle_response_database
import discord.webhook
import datetime
import time

app = Flask(__name__)
form_db = form.pickle_form_database.PickleFormDatabase("forms.pkl")
response_db = response.pickle_response_database.PickleResponseDatabase("responses.pkl")


@app.route("/forms", methods=["GET"])
def form_list_page():
    # TODO: Check if request is authenticated.
    # TODO: If no Discord user is authenticated, redirect to Discord OAuth.
    all_forms = form_db.get_all_forms()
    return (
        html_util.render_form_list_page_html(all_forms),
        200,
        {"Content-Type": "text/html"},
    )


@app.route("/forms/new", methods=["GET"])
def new_form_page():
    # TODO: Check if request is authenticated.
    # TODO: If no Discord user is authenticated, redirect to Discord OAuth.
    f = form.form.Form()
    form_db.save_form(f)
    return redirect(f"/forms/{f.id}", code=302)


@app.route("/forms/<form_id>", methods=["GET"])
def edit_form_page(form_id: str) -> tuple[str, int, dict[str, str]]:
    f = form_db.get_form(form_id)
    if f is None:
        return "Form not found", 404, {}

    if f.linked_discord_message != None and f.linked_discord_message.id != None:
        # TODO: Future work: Allow editing of sent forms.
        return "Form already sent", 400, {}

    return (
        html_util.render_form_form_html(f.id),
        200,
        {"Content-Type": "text/html"},
    )


@app.route("/forms/<form_id>", methods=["POST"])
def edit_form(form_id: str) -> tuple[str, int]:
    # Check if form exists.
    f = form_db.get_form(form_id)
    if f is None:
        return "Form not found", 404

    # TODO: Parse form data.
    form_data = request.form

    # Print form data.
    print(form_data)

    # Send the form if timestamp is not specified for autosend.
    # (
    #     f.linked_discord_message.id,
    #     f.linked_discord_message.timestamp,
    # ) = discord.webhook.execute_webhook(
    #     f.linked_discord_message.webhook_url,
    #     f.linked_discord_message.content,
    # )

    # Update the form to be sent
    # form_db.save_form(f)

    # TODO: If the timestamp is at a later date or time earlier than the current time,
    # then establish an execute_every_minute loop that will execute the webhook at the
    # specified time. Also on program init, check if there are any forms that need to
    # be sent and add them to the execute_every_minute loop.
    return "", 200


@app.route("/forms/<form_id>/cancel", methods=["POST"])
def cancel_autosend(form_id: str) -> tuple[str, int]:
    f = form_db.get_form(form_id)
    if f is None:
        return "Form not found", 404

    # Check if form has ID (i.e. is sent).
    if f.linked_discord_message is None:
        return "Form invalid", 400

    if f.linked_discord_message.id is not None:
        return "Form already sent", 400

    # Cancel the autosend.
    f.linked_discord_message.timestamp = None

    # Save the form.
    form_db.save_form(f)
    return "", 200


# @app.route("/<response_id>", methods=["GET"])
# def respond_form_page(response_id: str):
#     # Get the form by ID
#     # Render the form

# @app.route("/<response_id>", methods=["POST"])
# def respond_form(response_id: str):
#     # Get the form by ID
#     # Render the form


@app.route("/<response_id>", methods=["POST"])
def submit_form(response_id: str):
    # form_response = request.get_json()
    # Process the form response
    return redirect("/success?response_id=" + response_id, code=302)


@app.route("/success", methods=["GET"])
def success_page():
    return "HTML success page"


if __name__ == "__main__":
    app.run(port=8000)


def execute_every_minute(fn):
    while True:
        now = datetime.datetime.now()
        next_minute = (now + datetime.timedelta(minutes=1)).replace(
            second=0, microsecond=0
        )

        time_difference = (next_minute - now).total_seconds()
        time.sleep(time_difference)

        try:
            if fn():
                break
        except Exception as e:
            print(e)


def send_form_if_ready(f: form.form.Form) -> bool:
    if f.linked_discord_message is None:
        return False

    # Check if the form has already been sent.
    if f.linked_discord_message.id is not None:
        return False

    # Check if the form is ready to be sent.
    current_time = datetime.datetime.now()
    if (
        f.linked_discord_message.timestamp is None
        or f.linked_discord_message.timestamp > current_time
    ):
        return False

    # Send the form.
    (
        f.linked_discord_message.id,
        f.linked_discord_message.timestamp,
    ) = discord.webhook.execute_webhook(
        f.linked_discord_message.webhook_url,
        f.linked_discord_message.content,
    )

    # Update the form to be sent
    form_db.save_form(f)
    return True


def send_all_ready_forms():
    """
    Send all forms that are ready to be sent.
    """
    for f in form_db.get_all_forms():
        send_form_if_ready(f)


execute_every_minute(send_all_ready_forms)
