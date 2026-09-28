export const routes = [
  {
    id: 'rt-101',
    name: 'Express Line 101',
    departure: '06:30 AM',
    arrival: '09:15 AM',
    duration: '2h 45m',
    price: '$68.00',
    coachType: 'Premium AC'
  },
  {
    id: 'rt-203',
    name: 'Metro Connect 203',
    departure: '08:10 AM',
    arrival: '11:40 AM',
    duration: '3h 30m',
    price: '$52.00',
    coachType: 'Sleeper Plus'
  },
  {
    id: 'rt-318',
    name: 'Rapid Shuttle 318',
    departure: '10:00 AM',
    arrival: '01:05 PM',
    duration: '3h 05m',
    price: '$59.00',
    coachType: 'Executive'
  }
];

export const activityFeed = [
  {
    id: 'fd-1',
    title: 'Delay alert cleared',
    detail: 'Austin inbound coach A-14 recovered 12 minutes after route swap.',
    time: '09:24',
    tone: 'good'
  },
  {
    id: 'fd-2',
    title: 'High demand detected',
    detail: 'Evening departures to Houston are at 91% occupancy.',
    time: '09:16',
    tone: 'warn'
  },
  {
    id: 'fd-3',
    title: 'Refund approved',
    detail: 'Customer service processed a same-day cancellation for booking TF-2284.',
    time: '08:58',
    tone: 'neutral'
  }
];

export const demandInsights = [
  {
    city: 'Houston',
    message: 'Additional evening capacity recommended for corporate traffic.',
    load: 'Load factor 91%'
  },
  {
    city: 'San Antonio',
    message: 'Weekend bookings are trending above baseline after new promotion launch.',
    load: 'Load factor 84%'
  },
  {
    city: 'Waco',
    message: 'Midday trips still have room for dynamic pricing experiments.',
    load: 'Load factor 63%'
  }
];

export const passengers = [
  {
    id: 'ps-1',
    name: 'Maya Collins',
    route: 'Express Line 101',
    seat: 'A1',
    status: 'Checked in',
    request: 'Window seat confirmed'
  },
  {
    id: 'ps-2',
    name: 'Jordan Patel',
    route: 'Metro Connect 203',
    seat: 'B3',
    status: 'Payment pending',
    request: 'Invoice resend requested'
  },
  {
    id: 'ps-3',
    name: 'Elena Brooks',
    route: 'Rapid Shuttle 318',
    seat: 'C2',
    status: 'Boarding soon',
    request: 'Accessibility assistance'
  }
];
