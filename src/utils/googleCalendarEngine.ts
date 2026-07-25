import { CalendarMilestone } from '../data/milestoneCalendarData';

export function getGoogleCalendarMilestoneUrl(milestone: CalendarMilestone): string {
  const currentYear = new Date().getFullYear();
  
  // Format start and end date for current year
  const startIso = `${currentYear}${milestone.month}${milestone.day}T090000Z`;
  const endIso = `${currentYear}${milestone.month}${milestone.day}T100000Z`;

  const titleText = `🏏 VK18 Anniversary: ${milestone.title}`;
  const detailsText = `${milestone.description}\n\nFormat: ${milestone.format}\nOpponent: ${milestone.opponent}\nYear Achieved: ${milestone.yearScored}\n\nSynced via VK18 Telemetry Hub.`;

  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: titleText,
    details: detailsText,
    location: milestone.venue,
    dates: `${startIso}/${endIso}`,
    recur: 'RRULE:FREQ=YEARLY', // Repeats every year on this exact date
  });

  return `${baseUrl}?${params.toString()}`;
}
