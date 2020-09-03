from flask import Flask, request, render_template_string, redirect, abort
import string

app = Flask(__name__)


white_list = string.ascii_letters + string.digits + '()_-{}."[]=/'
black_list = ["codecs", "system", "for", "if",
              "end", "os", "eval", "request", "write",
              "mro", "compile", "execfile", "exec",
              "subprocess", "importlib", "platform", "timeit",
              "import", "linecache", "module", "getattribute",
              "pop", "getitem", "decode", "popen",
              "ifconfig", "flag", "config"]


def check(s):
    # print(len(s))
    if len(s) > 131:
        abort(500, "hacker")
        # abort(500, "hacker len")
    for i in s:
        if i not in white_list:
            abort(500, "hacker")
            # abort(500, "hacker white")
    for i in black_list:
        if i in s:
            abort(500, "hacker")
            # abort(500, "hacker black")


@app.route("/", methods=["POST"])
def hello_world():
    try:
        name = request.form["name"]
    except Exception:
        return render_template_string("<h1>request.form[\"name\"]<h1>")

    if name == "":
        return render_template_string("<h1>hello world!<h1>")

    check(name)
    template = '<h1>hello {}!<h1>'.format(name)
    res = render_template_string(template)
    if "flag" in res:
        abort(500, "hacker")
    return res


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)