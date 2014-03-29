#!/usr/bin/env python
# -*- coding: utf-8 -*-

import mongoengine
from flask import Flask, render_template, session, request, jsonify

import config
from model.user import User, hash_password

# Flask app
app = Flask(__name__)

# DB init
mongoengine.connect(config.db_name)
User.drop_collection()
dummy = User.new_user('test@test.com', 'password')
dummy.save()

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/api/shader")
def api_shader():
    code = """
    void main()
    {
        gl_FragColor = vec4(0.4,0.4,0.8,1.0);
    }
    """
    return code

@app.route("/api/signin")
def api_connect():
    email, password = request.json['email'].lowercase(), request.json['password']
    try:
        user = User.objects.get(email=email)
        if user.secret_hash == hash_password(password, user.salt):
            connect_user(user)
        else:
            return jsonify(ok=False)
    except mongoengine.DoesNotExist:
        return jsonify(ok=False)

def connect_user(user):
    session['logged_in'] = user.email

if __name__ == "__main__":
    app.run('0.0.0.0', 5000, debug=True)