import json

file_path = r'C:\Users\riyan\comments.json'

# Open the JSON file
with open(file_path, 'r') as file:
    # Load JSON data
    data = json.load(file)

from pydocumentdb import document_client, documents

ENDPOINT = ''
MASTERKEY = ''

client = document_client.DocumentClient(ENDPOINT, {'masterKey': MASTERKEY})

DATABASE_ID = 'youtube_comments'
COLLECTION_ID = 'comments'

database_definition = {'id': DATABASE_ID}
collection_definition = {'id': COLLECTION_ID}

database = client.CreateDatabase(database_definition)
collection = client.CreateCollection(database['_self'], collection_definition)

for record in data:
    client.UpsertDocument(collection['_self'], record)


