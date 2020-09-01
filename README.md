# faculty-voting
CS 410, Fall 2020

### Initial Meeting:
- Ask for their overall vision and don't try to impose any restrictions; it's a time to listen and not judge.
- Actively ask questions (Lead, you're in charge of keeping the meeting going, but everyone should be comfortable asking questions), and (Scribe) take notes; we want to understand and document the vision.
  * What are you doing now to solve this problem? (Try to assess and feel the client's needs and challenges and capture them)
  * Ideal user experience?
  * What did you like/disklike about the previous version?
  * Platform? Web-based, app, both?
  * Priority for platforms?
  * Key features you want?
  * Things to avoid?
  
- Think big: ask questions to gauge the scope of the project, and what the ultimate goals are.

- **Let the client know that you are going to come up with a proposal and that you would like to meet next week to discuss it.**
- **Set up the next meeting before ending. Middle of the week is better so that I can meet with you before and after.**

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
    * **Discuss whether it should be all multiple choice or only those designated by the host
- Within a session room, polls are displayed in an 'agenda' (ordered list of polls)
  * Agenda can be reordered by simply dragging polls to their desired order
 
##### Joining a Session 
- **Options for joining a session**
  * User recieves session room code from the Host and enters a session similar to Kahoot (system checks to see if can enter/what type of room user)
  * User enters session room by clicking on the active session on their dashboard

##### Anonimity 
- Anonimity begins as soon as a user enters a session
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
 
