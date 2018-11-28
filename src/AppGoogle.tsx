import * as React from 'react';
import './App.css';

import * as moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getCalendarEvents, IEvent } from './utils';

interface IState {
    events: IEvent[]
}
class App extends React.Component<{}, IState> {

    public localizer = BigCalendar.momentLocalizer(moment);

    constructor(props: {}) {
        super(props);
        this.state = {
            events: []
        }
    }

    public componentDidMount(): void {
        getCalendarEvents()
        .then((events: IEvent[]) => {
            this.setState({
                events
            });
        });
    }
    public render() {
        const { events } = this.state;
        return (
            <div className="App">
                <div
                    style={{ height: '100%' }}>
                    <BigCalendar
                        localizer={this.localizer}
                        events={events}
                    />
                </div>
            </div>
        );
    }
}

export default App;
