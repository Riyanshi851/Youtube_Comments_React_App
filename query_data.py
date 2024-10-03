from pydocumentdb import document_client

ENDPOINT = ''
MASTERKEY = ''

client = document_client.DocumentClient(ENDPOINT, {'masterKey': MASTERKEY})

DATABASE_ID = 'youtube_comments'
COLLECTION_ID = 'comments'

# Define the SQL query
query = 'SELECT * FROM c'

# Execute the SQL query
query_result = list(client.QueryDocuments(
    'dbs/' + DATABASE_ID, 
    'SELECT * FROM ' + COLLECTION_ID
))

# Iterate over the query results
for document in query_result:
    print(document)
