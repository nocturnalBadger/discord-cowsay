import requests
import os

APPLICATION_ID = os.environ["DISCORD_APPLICATION_ID"]

url = f"https://discord.com/api/v8/applications/{APPLICATION_ID}/commands"

commands = [
    {
        "name": "cowsay",
        "description": "ask a cow to say something",
        "options": [
            {
                "name": "message",
                "description": "what you want the cow to say",
                "type": 3,
                "required": True,
            },
            {
                "name": "cowfile",
                "description": "which template to use",
                "type": 3,
                "required": False,
                "choices": [
                    {
                        "name": "tux",
                        "value": "tux.cow",
                    },
                    {
                        "name": "elephant",
                        "value": "elephant.cow",
                    },
                    {
                        "name": "bunny",
                        "value": "bunny.cow",
                    },
                    {
                        "name": "docker",
                        "value": "docker.cow",
                    },
                    {
                        "name": "dragon-and-cow",
                        "value": "dragon-and-cow.cow",
                    },
                    {
                        "name": "dragon",
                        "value": "dragon.cow",
                    },
                    {
                        "name": "elephant-in-snake",
                        "value": "elephant-in-snake.cow",
                    },
                    {
                        "name": "koala",
                        "value": "koala.cow",
                    },
                ]
            },
        ]
    },
    {
        "name": "cowthink",
        "description": "ask a cow to think something",
        "options": [
            {
                "name": "message",
                "description": "what you want the cow to think",
                "type": 3,
                "required": True,
            },
        ]
    }
]


def get_token():
    API_ENDPOINT = 'https://discord.com/api/v8'
    CLIENT_SECRET = os.environ["DISCORD_CLIENT_SECRET"]
    data = {
        'grant_type': 'client_credentials',
        'scope': 'applications.commands.update'
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    r = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers, auth=(APPLICATION_ID, CLIENT_SECRET))
    r.raise_for_status()

    return r.json()["access_token"]


token = get_token()

# or a client credentials token for your app with the applications.commands.update scope
headers = {
    "Authorization": "Bearer " + token
}

for json in commands:
    r = requests.post(url, headers=headers, json=json)
    print(r)
    print(r.text)
