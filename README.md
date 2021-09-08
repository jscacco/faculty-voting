## Welcome!
This project was created by Louise Thompson, Chad Dubin, Connor Cates, and Jack Scacco for their Fall 2020 senior seminar project. It is currently out of use and serves as a working proof of concept for a secure, anonymous faculty voting web application. All keys found in this project are deprecated, the firebase project is closed, and the files no longer reside on the server. As such, please consider this project a showcase of skill rather than a deployed project. Our final presentation on the project can be found here: https://docs.google.com/presentation/d/1PncjNWyqTFLcZPNvRafsBNj1wX2cobH3ApibsYnvXCw/edit?usp=sharing 

# faculty-voting
CS 410, Fall 2020

## IMPORTANT INFO - HOW TO SETUP
In order to use this project, a few keys and authentication files must be generated and moved to specific directories before the project can work.
- First, you must generate secret hash key to be stored on the server. Here's how it's done:
 To start, ssh into the server, navigate to the project directory, then /express_server/api/databaseFunction. This is where we will be storing the key we use; delete the file 'hmac_cred.txt' if it already exists (NOTE: this will invalidate all currently existing rooms + polls). Next, use OpenSSL to generate the key and store it in 'hmac_cred.txt' by issuing the following command: 'openssl rand -out hmac_cred.txt -base64 -36'.
 - Next, we need to set a private key for the firebase project and download the JSON file from the firebase console. Follow the instructions here: https://firebase.google.com/docs/admin/setup
 - NOTE: there are two files on the server and on the frontend which contain sensitive information regarding the firebase project, such as api keys. We have removed them from this repository for the sake of security.
 
 Once these steps are completed the project will work and you will have unique keys generated. Now, move onto the next section for instructions on how to run the program!
 
 ## HOW TO RUN THE PROGRAM
 There are two main programs which need to run in order to get the project running. (NOTE: you must download 'npm' to run the code. Follow these instructions: https://www.npmjs.com/get-npm) If you are using this project on the server, you don't need to worry about either step. However, if you would like to test this project on localhost, do the following:
 - First, navigate to the project's directory and then '/code'. Then, issue the following two commands: 'npm install', then 'npm start'. This will start the frontend. 
 - Now, open a new terminal and navigate to the project's directory and then '/express_server/api/'. Then, run 'npm start'. This will start the backend.
 - In order to get the frontend communicating with the backend, there a few changes that need to be made to several files. First, navigate to the project's directory and then '/code/src/databaseCommunication'. Next, in both 'pollFunctions.js' and 'roomFunctions.js', replace all occurences of the string 'https://facvultyvoting.hamilton.edu' with the string 'http://localhost'. Leave the rest of these strings as is. For example, replace https://facultyvoting.hamilton.edu:4000/poll/updatePoll' with 'http://localhost:4000/poll/updatePoll'. Next, navigate to the project's directory and then '/express_server/api/bin/www'. In this file, uncomment line 29 (var server = http.createServer(app);) and comment out line 30 (var server = https.createServer({key: key, cert: cert }, app)). Finially, change line 36 (server.listen(port)) to server.listen(port, '150.209.91.65'). Now, the backend and frontend should be able to communicate with one another on localhost.
 
### Fleshed-Out Proposal
#### Pre-Session
##### Login 
- Users login to website/app through the secure Hamilton login portal 
  * ensures that hosts can control who is voting

##### Session Generation
- Hosts create poll sessions that serve as a room for all polls
- Hosts can choose viewing and voting permissions of each room
  * Filter by Faculty, Students, Voting Faculty etc.
  * Add/Remove individuals manually
  * Note that viewing/voting are seperate - those with viewing memberships can view polls and results, but not vote
- Hosts can assign co-host
  * Co-hosts can add/rearrange polls, start quick-polls, close polls (we should discuss limitations of co-hosts, if there are any)
- **Disscus if hosts and co-hosts should be able to vote (we may be able to understand this in the meeting tonight)**
- Sessions remain unviewable until published by the host 
  * **Discuss what happens when a session is published -- either session room code is created to be sent to individuals or session room code appears on users 'Dashboard'**

##### Creating a Poll/Session Structure
- Various types of polls: Y/N, multiple choice, short answer
  * Each type of poll has an 'Abstain' option 
  * Multiple choice questions can also have a write in section 
    * **Discuss whether it should be all multiple choice or only those designated by the host**
- Within a session room, polls are displayed in an 'agenda' (ordered list of polls)
  * Agenda can be reordered by simply dragging polls to their desired order
 
##### Joining a Session 
- **Options for joining a session**
  * User recieves session room code from the Host and enters a session similar to Kahoot (system checks to see if can enter/what type of room user)
  * User enters session room by clicking on the active session on their dashboard

##### Anonymity 
- Anonymity begins as soon as a user enters a session
- Whether or not the user is a viewer or voter is assest exterior to the voting room, once inside knowledge of a non-host user is binary: view or voter
- **Discuss: should a host be aware of who has entered the room (not what they vote) or how many people are in the room**

#### In-Session
##### Viewing Polls
- Once a user has entered a session, they can view the agenda (the ordered list of polls)
  * Closed polls - marked red, results can be viewed
  * Open polls - marked green, vote can be viewed 
  * Pending polls - marked grey, voting options/descriptoin can be viewed

##### Voting 
- Host/co-hosts open a pending poll to allow voting 
- User is allowed to enter an open poll and vote on their choice
  * Use a 2-click system to ensure no mistaken polls 
    * Options for this could be: choose option / submit, choose option / pop-up "Are you sure?"
  * After each vote, confirmation of recorded vote (either check mark or popup or both)
- **Users cannot see results until a poll is closed -- allows them to recast their votes without being swayed**
- During the voting proccess hosts can use either a time limit or manually close the polls
  * **Discuss: Offer some graphic for hosts/viewers of voting progress? -- actuall results or 'fuzzy' results**
  * closing a poll seals the results and allows voters to view results
 
##### Dynamic Polling 
- Hosts/co-hosts can alter the session while published/active
- Add new polls
- Remove polls 
  * **Discuss if should be able to remove closed polls**
- Only pending polls can be altered 
  * Change wording of poll
  * Change ordering of pending adgenda
- Quick polls 
  * Pop-up Y/N/Abstain polls for small votes such as changes in wording or smaller motions
 
#### Post-Session
##### Closing Polls/Session
- Host or co-hosts can close polls
- Host only can close a session 
  * closes any open polls
  * prevents any new edits (poll additions/removals/changes)
- All poll results are available and able to convert them to a PDF
 
### Faculty Voting Meeting Notes
- Meeting is not recorded
- Any faculty member that teaches more than half-time is able to vote
- Current system
  * Anonymous 
  * Users see polling in percentages
  * Hosts see actual numbers -- I think?
- quick poll example
  * amending the minutes
- Y/N/Abstain
- Results - can see numbers/percentages
- User - select choice, then submit
- Viewer - can see choices, no submit
  * can see results
- **Strash suggestion: Movement documents integrated into vote**
