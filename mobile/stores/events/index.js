import {observable, action, computed} from 'mobx'
import firebase from 'firebase/app';
import { LOADING_STATES } from './constants';

class EventsStore {
    @observable state = '';
    @observable events = [];

    @action getEvents = () => {
        this.state = LOADING_STATES.LOADING;

        firebase.database()
            .ref('events').once('value')
            .then(this.eventsRequestSuccess, this.eventsRequestError);
    };
    sortEvents = (events) => { 
       return Object.entries(events).map(([ id, event ]) => ({ id, ...event }))
    }

    @action.bound eventsRequestSuccess = (events) => {
        this.state = LOADING_STATES.LOADED;
        this.events = this.sortEvents(events.val());
    };

    @action.bound eventsRequestError = (err) => {
       console.info(err);
    };
}

export default EventsStore