/*
 *  RoomItem class 
 */

//import sendPollInfo, { getAllPolls }  from '../DatabaseCommunicator';
import firebase                        from '../firebase';
export default class RoomItem {

    constructor() {
        this.roomTitle = '';
        this.pollTitles = [];
        this.roomCode = '';
        this.host = '';
        this.cohosts = [];
        this.status = 'pending';
    }
  
    logData() {
        console.log("----------ROOM DATA----------")
        console.log("\t\tRoomTitle: " + this.roomTitle);
        console.log("\t\tPolls: " + this.pollTitles);
        console.log("\t\tRoomCode: " + this.roomCode);
        console.log("\t\thost: " + this.host);
        console.log("\t\tcohosts: " + this.cohosts);
        console.log("\t\tstatus: " + this.status);
        console.log("-----------------------------")
    }
 
    async publishRoom() {
        const docRef = firebase.firestore().collection(this.host).doc(this.roomCode)
        docRef.get()
            .then(docSnapshot => {
                if(docSnapshot.exists) {
                    alert("WARNING! RoomCode already exists");
                }
                else {
                    docRef.set({
                       roomTitle: this.roomTitle,
                       status: this.status 
                    })
                }
            });
    }

    openRoom() {
        this.status = 'open';
    }

    closeRoom() {
        this.status = 'close';
    }

    setHost(host) {
        this.host = host;
    }

    setRoomTitle(title) {
        this.roomTitle = title;
    }

    setRoomCode(roomCode) {
        this.roomCode = roomCode;
    }

    addCohost(cohost) {
        this.cohosts = [...this.cohosts, cohost];
    }

    addPoll(poll) {
        this.pollTitles = [...this.pollTitles, poll.title];
        this.sendPollInfo(poll);
    }

    getPolls() {
        return this.pollTitles;
    }

    getPath() {
        return firebase.firestore().collection(this.host).doc(this.roomCode).collection(this.roomCode);
    }

    sendPollInfo(poll) {
        firebase
            .firestore()
            .collection(this.host)
            .doc(this.roomCode)
            .collection(this.roomCode)
            .doc(poll.title)
            .set({
                description: poll.description,
                showResults: poll.showResults,
                order: poll.order,
                status: poll.status,
                pollType: poll.pollType
            });

        for(var i = 0; i < poll.options.length; i++) {
            var optionRef = firebase.firestore().collection(this.host).doc(this.roomCode).collection(this.roomCode).doc(poll.title).collection("Options").doc("Option" + (i + 1));
                
            optionRef.set({ optionType: "text" });
            
            optionRef.collection("Option" + (i + 1)).doc("Option" + (i + 1)).set(poll.options[i]);
        }
    }
  }
  