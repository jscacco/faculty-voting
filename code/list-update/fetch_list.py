from __future__ import print_function
import pickle
import os.path
import pyrebase
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# HERE IS THE LINK TO THE GOOGLE SHEET:
# https://docs.google.com/spreadsheets/d/1hWbvBy07p8OXFgiDzs3Khdxjp8phcnASr6M_Z6nqy_8/edit?usp=sharing


# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

def get_creds():
    """ This code was pre-written and is a part of quickstart.py. """
    
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    return creds


def get_values(sheet_id, sheet_range):
    """ Return the list of values from the sheet. """

    # Build the service
    creds = get_creds()
    service = build('sheets', 'v4', credentials=creds)

    # Call the Sheets API to get the names & usernames
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=sheet_id,
                                range=sheet_range).execute()
    values = result.get('values', [])
    if not values:
        print("ERROR: no data found in spreadsheet!")
        return []
    else:
        return values


def delete_all_users(db):
    """ Removes all users from the database. """

    # try-except because this will fail if the db is empty
    try:
        for user in db.get().each():
            db.child(user.key()).remove()
    except:
        return


def add_users(db, values):
    """ Adds the users in values to db. """
    for row in values:
        name = row[0] + " " + row[1]
        data = {"first": row[0],
                "last": row[1],
                "username": row[2]}
        db.child(name).set(data)

        
def main():

    print("fetching users...")
    
    # setup firebase
    pyrebase_config = {
        "apiKey": "AIzaSyAYAdgWYuEmNnV5LhKFJg5PAzIk8KmHtEA ",
        "authDomain": "faculty-voting.firebaseapp.com",
        "databaseURL": "https://faculty-voting.firebaseio.com/eligible",
        "storageBucket": "faculty-voting.appspot.com" }
    firebase = pyrebase.initialize_app(pyrebase_config)
    
    # setup sheet
    sheet_id = '1hWbvBy07p8OXFgiDzs3Khdxjp8phcnASr6M_Z6nqy_8'
    sheet_range = 'Sheet1!A2:C'

    db = firebase.database()
    values = get_values(sheet_id, sheet_range)

    delete_all_users(db)
    add_users(db, values)

    print("success!")
    

    
if __name__ == '__main__':
    main()
