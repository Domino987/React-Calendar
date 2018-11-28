
const CALENDAR_ID = 'n5e39qbb9m9a6m2lbhsjijf91s@group.calendar.google.com';
const API_KEY = 'AIzaSyBDsSyv1Fn1TREuhM9iUGnpKxizKqolCP8';
const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

export interface IEvent {
    start: Date
    end: Date
    title: string
    description: string
}

interface IServerResponse {
    items: IResponseItem[]
}

interface IResponseItem {
    description: string
    summary: string
    start: {
        dateTime: string
    }
    end: {
        dateTime: string
    }
}

/**
 * Retrieves the calendar events from the server and delivers returns them
 * through the callBack.
 * @export
 * @param {(eventArray: IEvent[]) => void} callback The callback to return the obtained events
 */
export function getCalendarEvents(): Promise<IEvent[]> {
    return fetch(url)
        .then(response => response.ok ? response.json() : null)
        .then((events: IServerResponse | null) => {
            if (events) {
                const extractedEvents: IEvent[] = [];
                for (const item of events.items) {
                    extractedEvents.push({
                        description: item.description,
                        end: new Date(item.end.dateTime),
                        start: new Date(item.start.dateTime),
                        title: item.summary
                    });
                }
                return extractedEvents;
            } else {
                return [];
            }
        })
        .catch(() => {
            return [];
        });
}